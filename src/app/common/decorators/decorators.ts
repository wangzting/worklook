import { CommonValidators } from '../validators/commonValidators';


/**
 * 自定义验证器的装饰器
 * 作用：判断是否需要启动验证器
 * @export
 * @param {*} target
 * @param {string} name
 * @param {*} descriptor
 * @returns
 */
export function ValidatorCondition(target: any, name: string, descriptor: any) {
  // 保存原方法的引用
  const originMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    // 遍历参数
    for (const arg of args) {
      // 如果参数中有函数类型的，默认为condition函数
      if (arg instanceof Function) {
        // 如果condition函数的运行的结果是false，则认为不需要验证
        if (arg() === false) {
          // 不需要验证的情况下返回一个一定会验证成功的验证器
          return CommonValidators.Invalid;
        }
      }
    }
    // 调用原方法
    return originMethod.apply(this, args);
  };
  // 返回编辑后的属性描述对象
  return descriptor;
}
