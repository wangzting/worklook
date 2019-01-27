import { ControlContainer, AbstractControl } from '@angular/forms';
import { Component, OnInit, DoCheck, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-equal-group',
  templateUrl: './equal-group.component.html',
  styleUrls: ['./equal-group.component.scss']
})
export class EqualGroupComponent implements DoCheck, OnInit {

  // 自定义控件
  public inputFormGroup: AbstractControl;

  // 显示提示语
  public hintShowFlag = true;

  // 是否显示错误
  get errorShowFlag() {
    return !this.inputFormGroup.valid &&
      this.inputFormGroup.errors &&
      Object.keys(this.inputFormGroup.errors).includes('equalInGroup');
  }
  // 错误信息
  get errorInfo() {
    return this.inputFormGroup.errors['equalInGroup'];
  }

  constructor(
    private controlContainer: ControlContainer
  ) { }

  ngOnInit(): void { }

  /**
   * DoCheck事件回调函数
   *
   * @memberof EqualGroupComponent
   */
  ngDoCheck() {
    this.inputFormGroup = this.controlContainer.control;
  }
}
