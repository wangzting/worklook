import { Component, Input } from '@angular/core';
import { SelfForm } from '../../implements/selfForm';
import { ErrorInfo } from '../../validators/error.type';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements SelfForm {

  // 错误对象
  @Input() errorInfo: ErrorInfo;

  constructor() { }

  /**
   * 输入属性check
   *
   * @memberof ErrorComponent
   */
  public inputCheck() {
    if (!(this.errorInfo instanceof ErrorInfo)) {
      throw new Error('ErrorComponent的参数不正确。');
    }
  }
}
