import { ValidatorsType } from './validators.type';

export class ErrorInfo {

  // 目标
  public label: string;

  // 错误类型
  public validatorType: ValidatorsType;

  // 最小长度
  public minLength: number;

  // 最大长度
  public maxLength: number;

  /**
   *Creates an instance of ErrorInfo.
   * @param {number} validatorType
   * @param {number} [minLength]
   * @param {number} [maxLength]
   * @memberof ErrorInfo
   */
  constructor(validatorType: ValidatorsType, minLength?: number, maxLength?: number) {
    this.label = '';
    this.validatorType = validatorType;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
}
