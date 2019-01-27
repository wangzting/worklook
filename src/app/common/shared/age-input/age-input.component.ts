import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { map } from 'rxjs/operators/map';
import { merge } from 'rxjs/operators/merge';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { subYears, subMonths, subDays, format } from 'date-fns';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  age: number;
  unit: AgeUnit;
}
export interface DateValue {
  from: 'age' | 'birth';
  dateOfBirth: string;
}
export const AgeInput_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AgeInputComponent),
  multi: true
};

@Component({
  selector: 'age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [AgeInput_VALUE_ACCESSOR]
})
export class AgeInputComponent implements OnInit, ControlValueAccessor {

  // 当前选择的单位
  public selectedUnit = AgeUnit.Year;
  // 单位List
  public ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];

  // 传递给宿主元素的值
  private _dateOfBirth: string;

  // 控件的form
  public forms: FormGroup;

  /**
   * 取得dateOfBirth值
   *
   * @type {*}
   * @memberof AgeInputComponent
   */
  get dateOfBirth(): any {
    return this._dateOfBirth;
  }

  /**
   * dateOfBirth值改变时重复的方法
   *
   * @memberof AgeInputComponent
   */
  set dateOfBirth(value: any) {
    // 设置dateOfBirth的值
    this._dateOfBirth = value;
    // 值改变时触发的事件
    this.notifyValueChange();
  }

  /**
   * 把内部change改变emit给外部
   *
   * @memberof AgeInputComponent
   */
  onChange: (value) => {};

  /**
   * 把内部touch改变emit给外部
   *
   * @memberof AgeInputComponent
   */
  onTouched: () => {};

  /**
   *Creates an instance of AgeInputComponent.
   * @param {FormBuilder} fb
   * @memberof AgeInputComponent
   */
  constructor(
    private fb: FormBuilder
  ) {
    // 初始化form表单
    this.initForm();
  }

  /**
   * 初始化form表单
   *
   * @private
   * @memberof AgeInputComponent
   */
  private initForm() {
    // 初始化form表单
    this.forms = this.fb.group({
      birthday: [''],
      age:  this.fb.group({
        ageNum: [''],
        ageUnit: ['']
      })
    });
  }

  /**
   * OnInit的回调函数
   *
   * @memberof AgeInputComponent
   */
  ngOnInit(): void {
    const birthday: FormControl = this.forms.get('birthday') as FormControl;
    const ageNum: FormControl = this.forms.get('age.ageNum') as FormControl;
    const ageUnit: FormControl = this.forms.get('age.ageUnit') as FormControl;
    const birthday$: Observable<string> = birthday.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    );
    const ageNum$: Observable<number> = ageNum.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    );
    const ageUnit$: Observable<AgeUnit> = ageUnit.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    );
    const birth$: Observable<DateValue> =  birthday$.pipe(
      map(
        (birth: any): DateValue => {
          return {
            from: 'birth',
            dateOfBirth: format(birth, 'YYYYMMDD')
          };
        }
        )
    );
    const age$: Observable<DateValue> = ageNum$.pipe(
      combineLatest(ageUnit$),
      map(
        ([_num, _unit]): DateValue => {
          return {
            from: 'age',
            dateOfBirth: this.toDate({age: _num, unit: _unit})
          };
        }
        )
      );
    const dateOfBirth$: Observable<DateValue> = birth$.pipe(
      merge(age$)
    );
    dateOfBirth$.subscribe(
      (dateValue: DateValue) => {
        this.dateOfBirth = dateValue.dateOfBirth;
        if (dateValue.from === 'birth') {
          console.log(dateValue.dateOfBirth);
        } else {
          console.log(dateValue.dateOfBirth);
        }
      }
    );
  }

  /**
   *
   * 输入的年龄转换为日期
   * @param {Age} age
   * @memberof AgeInputComponent
   */
  private toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), 'YYYYMMDD');
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), 'YYYYMMDD');
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), 'YYYYMMDD');
      }
      default: {
        return this.dateOfBirth;
      }
    }
  }
  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.dateOfBirth);
    }
  }

  writeValue(obj: any): void {
    this.dateOfBirth = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
