import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Optional,
  Output,
  EventEmitter,
} from '@angular/core';

import { ControlContainer, AbstractControl } from '@angular/forms';
import { SelfForm } from 'src/app/common/implements/selfForm';
import { ErrorInfo } from 'src/app/common/validators/error.type';
import { ValidatorsType } from 'src/app/common/validators/validators.type';

@Component({
  selector: 'cb-input',
  templateUrl: './combat-input.component.html',
  styleUrls: ['./combat-input.component.scss'],
})
export class CombatInputComponent implements OnInit, OnChanges, SelfForm {

  // 控件的名称
  @Input() label: string;

  // 输入框控件的名称
  @Input() cbFormControlName: string;

  // 控件类型：text pasword
  @Input() type: string = 'text' || 'password';

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

  // 输入框控件
  public cbFormControl: AbstractControl;

  // 显示提示语
  public hintShowFlag = false;

  // 是否显示错误
  get errorShowFlag() {
    return !this.cbFormControl.valid;
  }
  // 错误信息
  get errorInfo(): ErrorInfo {
    const type: string = Object.keys(ValidatorsType).find(
      (key) => {
        return this.cbFormControl.errors[key];
      }
    );
    const errorInfo: ErrorInfo = this.cbFormControl.errors[type];

    errorInfo.label = this.label;

    return errorInfo;
  }

  constructor(
    @Optional()
    private controlContainer: ControlContainer
  ) {
  }

  ngOnInit () {
    // 输入框的值发生改变时
    // TODO 把订阅写在这里是监听不到表单控件的第一次变化的
    this.cbFormControl.valueChanges.subscribe(
      (pwd: string) => {
        // 把改变传递给父组件
        this.valueChanges.emit(pwd);
      }
    );
  }


  /**
   *
   * blur事件
   * @memberof CombatInputComponent
   */
  onBlur(ev: Event) {
    // 隐藏提示语
    this.hintShowFlag = false;

    // 发出事件
    this.blur.emit(this.cbFormControl.value);
  }
  /**
   *
   * focus事件
   * @memberof CombatInputComponent
   */
  onFocus(ev: Event) {
    // 显示提示语
    this.hintShowFlag = !!this.hint;

    // 发出事件
    this.focus.emit(this.cbFormControl.value);
  }
  /**
   *
   * OnChanges事件的回调函数
   * @param {SimpleChanges} changes
   * @memberof CombatInputComponent
   */
  ngOnChanges (changes: SimpleChanges) {
    // 输入属性Check
    this.inputCheck();

    // 输入框控件的名称变更时对应修改自定义控件的formControl
    if (changes['cbFormControlName']) {
      if (this.controlContainer && this.controlContainer.control.get(this.cbFormControlName)) {
        this.cbFormControl = this.controlContainer.control.get(this.cbFormControlName);
      }
    }
  }


  /**
   *
   *输入属性Check
   * @memberof CombatInputComponent
   */
  public inputCheck() {
    // 输入框控件的名称不能为空
    if (!this.cbFormControlName) {
      throw new Error('CombatInputComponent控件必须指定cbFormControlName。');
    }
  }
}
