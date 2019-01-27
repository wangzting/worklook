import { ValidationErrors, AbstractControl } from '@angular/forms';
export class CommonValidators {

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
}
