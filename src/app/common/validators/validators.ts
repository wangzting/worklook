import { ValidatorsType } from './validators.type';
import { ErrorInfo } from './error.type'

import { ValidatorFn, FormGroup, ValidationErrors, FormControl, AbstractControl } from '@angular/forms';
import { ValidatorCondition } from '../decorators/decorators';

export class SelfValidators {


  /**
   * 一个空的验证器，直接返回通过验证
   *
   * @static
   * @param {AbstractControl} abstractControl
   * @returns {ValidationErrors}
   * @memberof SelfValidators
   */
  public static Invalid(abstractControl: AbstractControl): ValidationErrors {
    return null;
  }
  /**
   * 判断FormGroup内的FormControl的值是否相等
   *
   * @static
   * @param {FormGroup} formGroup
   * @param {() => boolean} [condition]
   * @returns {ValidationErrors}
   * @memberof SelfValidators
   */
  @ValidatorCondition
  public static equalInGroup(condition?: () => boolean): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      // 判断输入是否正确
      if (!(formGroup instanceof FormGroup)) {
        return null;
      }
      // FormGroup映射成子FormControl的value
      const controlsValue: any = Object.keys(formGroup.controls).map(
        (controlName: string) => {
          return formGroup.controls[controlName].value;
        }
      );
      // controlsValue去重复
      const disDiff: any[] = Array.from(new Set(controlsValue));
      // 子FormControl的value有不相同的情况
      if (disDiff.length > 1) {
        return {[ValidatorsType.equalInGroup]: new ErrorInfo(ValidatorsType.equalInGroup)};
      }
      return null;
    }
  }



  /**
   * 最大长度check
   *
   * @static
   * @param {number} maxLength
   * @param {() => boolean} [condition]
   * @returns {ValidatorFn}
   * @memberof SelfValidators
   */
  @ValidatorCondition
  public static maxLength(maxLength: number, condition?: () => boolean): ValidatorFn {
    // 需要传递参数给错误信息，所以这里返回一个验证器函数
    return (formControl: FormControl): ValidationErrors => {

      // 判断输入是否正确
      if (!(formControl instanceof FormControl)) {
        return null;
      }
      // 输入长度大于设定值时Error
      if (formControl.value.length > maxLength) {
        return {[ValidatorsType.maxLength]: new ErrorInfo(ValidatorsType.maxLength, null, maxLength)}
      }
      return null;
    }
  }

  /**
   * 最小长度check
   *
   * @static
   * @param {number} minLength
   * @param {() => boolean} [condition]
   * @returns {ValidatorFn}
   * @memberof SelfValidators
   */
  @ValidatorCondition
  public static minLength(minLength: number, condition?: () => boolean): ValidatorFn {
    // 需要传递参数给错误信息，所以这里返回一个验证器函数
    return (formControl: FormControl): ValidationErrors => {
      // 判断输入是否正确
      if (!(formControl instanceof FormControl)) {
        return null;
      }
      // 输入长度小于设定值时Error
      if (formControl.value.length < minLength) {
        return {[ValidatorsType.minLength]: new ErrorInfo(ValidatorsType.minLength, minLength)}
      }
      return null;
    }
  }

  /**
   *最大最小长度check
   *
   * @static
   * @param {number} minLength
   * @param {number} maxLength
   * @param {() => boolean} [condition]
   * @returns {ValidatorFn}
   * @memberof SelfValidators
   */
  @ValidatorCondition
  public static minAndMaxLength(minLength: number, maxLength: number, condition?: () => boolean): ValidatorFn {
    // 需要传递参数给错误信息，所以这里返回一个验证器函数
    return (formControl: FormControl): ValidationErrors => {
      // 判断输入是否正确
      if (!(formControl instanceof FormControl)) {
        return null;
      }

      // 长度check
      if (
        // 最小长度check不通过的场合
        !SelfValidators.minLength(minLength)(formControl) ||
        // 最大长度check不通过的场合
        !SelfValidators.maxLength(maxLength)(formControl)) {
          return {[ValidatorsType.minAndMaxLength]: new ErrorInfo(ValidatorsType.minAndMaxLength, minLength, maxLength)}
      }
      return null;
    }
  }

  /**
   *
   * 必须输入check
   * @static
   * @param {() => boolean} [condition]
   * @returns {ValidatorFn}
   * @memberof SelfValidators
   */
  @ValidatorCondition
  public static requireInput(condition?: () => boolean): ValidatorFn {
    return (formControl: FormControl) => {
      // 判断输入是否正确
      if (!(formControl instanceof FormControl)) {
        return null;
      }
      // 输入为空时不通过
      if (formControl.value === '') {
        return {[ValidatorsType.requireInput]: new ErrorInfo(ValidatorsType.requireInput)}
      }
      return null;
    }
  }
}
