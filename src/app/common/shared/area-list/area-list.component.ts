import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { Address } from '../../domain/model';

export const AREA_LIST_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AreaListComponent),
    multi: true
};

@Component({
    selector: 'area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.css'],
    providers: [AREA_LIST_VALUE_ACCESSOR]
})
export class AreaListComponent implements OnInit, ControlValueAccessor {

    // 与外部form表单直接绑定的值
    private _address: Address;

    set address(value: any) {
        this._address = value;
        this.notifyValueChange();
    }

    get address(): any {
        return this._address;
    }

    /**
     * 地址改变时通知外部form表单
     *
     * @memberof AreaListComponent
     */
    onChange: (value) => {};

    /**
     * 地址控件touch时通知外部form表单
     *
     * @memberof AreaListComponent
     */
    onTouched: () => {};

    /**
     *Creates an instance of AreaListComponent.
     * @memberof AreaListComponent
     */
    constructor() { }

    /**
     * 地址改变事件
     *
     * @memberof AreaListComponent
     */
    notifyValueChange(): void {
        if (this.onChange) {
            this.onChange(this.address);
        }
    }

    ngOnInit(): void {
        
    }

    writeValue(obj: any): void {
        this.address = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
