import { Pipe, PipeTransform } from '@angular/core';
import { ErrorInfo } from '../validators/error.type';
import { ValidatorsType } from '../validators/validators.type';

@Pipe({
  name: 'errorInfoToErrorMsg',
  pure: true
})
export class ErrorInfoToErrorMsg implements PipeTransform {

  // 必须输入check
  MSG_REQUIREINPUT = '不能为空';
  // 必须选择check
  MSG_REQUIRESELECT = '是必须选择的';
  // 最小值check
  MSG_MINLENGTH = ['最少', '位'];
  // 最大值check
  MSG_MAXLENGTH = ['最多', '位'];
  // 最小最大值check
  MSG_MINANDMAXLENGTH = ['是', '位到', '位的'];
  // 数字check
  MSG_NUMBER = '必须为数字';
  // 相等check
  MSG_EQUALINGROUP = '必须相同';

  transform(errorInfo: ErrorInfo): string {
    switch (errorInfo.validatorType) {
      case ValidatorsType.requireInput:
        return `${errorInfo.label}${this.MSG_REQUIREINPUT}`;
      case ValidatorsType.requireSelect:
        return `${errorInfo.label}${this.MSG_REQUIRESELECT}`;
      case ValidatorsType.minLength:
        return `${errorInfo.label}${this.MSG_MINLENGTH[0]}${errorInfo.minLength}${this.MSG_MINLENGTH[1]}`;
      case ValidatorsType.maxLength:
        return `${errorInfo.label}${this.MSG_MAXLENGTH[0]}${errorInfo.maxLength}${this.MSG_MAXLENGTH[1]}`;
      case ValidatorsType.minAndMaxLength:
        return `${errorInfo.label}${this.MSG_MINANDMAXLENGTH[0]}${errorInfo.minLength}${this.MSG_MINANDMAXLENGTH[1]}${errorInfo.maxLength}${this.MSG_MINANDMAXLENGTH[2]}`
      case ValidatorsType.number:
        return `${errorInfo.label}${this.MSG_NUMBER}`;
      case ValidatorsType.equalInGroup:
        return `${errorInfo.label}${this.MSG_EQUALINGROUP}`;
      default:
        return '';
    }
  }
}
