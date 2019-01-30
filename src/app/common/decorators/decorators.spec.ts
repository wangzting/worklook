import { ValidatorCondition } from './decorators';

describe('测试验证器装饰器', () => {
    describe('验证器没有验证函数', () => {
        it('应该返回验证器本身', () => {
            const target = {};
            const name = 'test';
            const descriptor = '';
            const result = ValidatorCondition(target, name, descriptor);
            expect(result).toEqual(descriptor);
        });
    });
});
