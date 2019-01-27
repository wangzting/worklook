import { SelfForm } from './../../../common/implements/selfForm';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, forwardRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorInfo } from 'src/app/common/validators/error.type';
import { ValidatorsType } from 'src/app/common/validators/validators.type';

export const COMPONENT_NAME_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelfInputComponent),
  multi: true
};

@Component({
  selector: 'my-input',
  templateUrl: './self-input.component.html',
  styleUrls: ['./self-input.component.scss'],
  providers: [COMPONENT_NAME_VALUE_ACCESSOR]
})
export class SelfInputComponent implements OnInit, ControlValueAccessor, SelfForm, OnChanges {

  // 控件的名称
  @Input() label: string;

  // 输入框的formControlName，绑定在宿主元素上时也是formControlName指令
  @Input() formControlName: string;

  // 控件类型：text pasword
  @Input() type: string = 'text' || 'password' || 'number';

  // 占位符
  @Input() placeholder?: string;

  // 提示语
  @Input() hint?: string;

  // valueChanges事件
  @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();
  // blur事件
  @Output() blur: EventEmitter<string> = new EventEmitter<string>();
  // focus事件
  @Output() focus: EventEmitter<string> = new EventEmitter<string>();

  // 当前输入框的值
  private _value: any;

  // 当前输入框的formControl
  public formControl: AbstractControl;

  // 显示提示语
  public hintShowFlag = false;

  // 是否显示错误
  get errorShowFlag() {
    return !this.formControl.valid;
  }
  // 错误信息
  get errorInfo(): ErrorInfo {
    const type: string = Object.keys(ValidatorsType).find(
      (key) => {
        return this.formControl.errors[key];
      }
    );
    const errorInfo: ErrorInfo = this.formControl.errors[type];

    errorInfo.label = this.label;

    return errorInfo;
  }


  /**
   * ngModelChange触发的事件
   *
   * @memberof SelfInputComponent
   */
  set value(value: any) {
    this._value = value;
    // 输入框的值改变时的处理
    this.notifyValueChange();
  }


  /**
   * 取得输入框的值
   *
   * @type {*}
   * @memberof SelfInputComponent
   */
  get value(): any {
    return this._value;
  }


  /**
   * 把内部change改变emit给外部
   *
   * @memberof SelfInputComponent
   */
  onChange: (value) => {};

  /**
   * 把内部touch改变emit给外部
   *
   * @memberof SelfInputComponent
   */
  onTouched: () => {};

  constructor(
    private controlContainer: ControlContainer
  ) { }
  /**
   *
   * OnChanges事件的回调函数
   * @param {SimpleChanges} changes
   * @memberof SelfInputComponent
   */
  ngOnChanges (changes: SimpleChanges) {
    // 输入属性Check
    this.inputCheck();

    // 输入框控件的名称变更时对应修改自定义控件的formControl
    if (changes['formControlName']) {
      if (this.controlContainer && this.controlContainer.control.get(this.formControlName)) {
        this.formControl = this.controlContainer.control.get(this.formControlName);
      }
    }
  }


  /**
   *
   *输入属性Check
   * @memberof SelfInputComponent
   */
  public inputCheck() {
    // 输入框控件的名称不能为空
    if (!this.formControlName) {
      throw new Error('SelfInputComponent控件必须指定formControlName。');
    }
  }
  /**
   * OnInit事件
   *
   * @memberof SelfInputComponent
   */
  ngOnInit(): void {
    // 通过宿主元素的form容器取得当前的formControl，取得宿主元素的formControl是为了取得表单验证结果
    // 这里把表单验证放在了宿主元素的层级上，没有放在自定义的表单控件中，主要是为了能在宿主元素中指定控件的验证器。
    // 这样就不必在自定义的控件中指定验证器，在自定义的控件中指定验证器的方法是注册validator的provide
    this.formControl = this.controlContainer.control.get(this.formControlName);
  }
  /**
   * 输入框的值改变时的处理
   *
   * @memberof SelfInputComponent
   */
  notifyValueChange(): void {
    if (this.onChange) {
      // 把改变emit给外部
      this.onChange(this.value);
    }
  }

  /**
   *
   * blur事件
   * @memberof SelfInputComponent
   */
  onBlur(ev: Event) {
    // 隐藏提示语
    this.hintShowFlag = false;

    // 发出事件
    this.blur.emit(this.value);
  }
  /**
   *
   * focus事件
   * @memberof SelfInputComponent
   */
  onFocus(ev: Event) {
    // 显示提示语
    this.hintShowFlag = !!this.hint;

    // 发出事件
    this.focus.emit(this.value);
  }

  /**
   * 写入控件值
   *
   * @param {*} obj
   * @memberof SelfInputComponent
   */
  writeValue(obj: any): void {
    this._value = obj;
  }

  /**
   * 当表单控件值改变时，函数 fn 会被调用
   * 这也是我们把变化 emit 回表单的机制
   * @param {*} fn
   * @memberof SelfInputComponent
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * 用于注册 touched 状态
   *
   * @param {*} fn
   * @memberof SelfInputComponent
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
