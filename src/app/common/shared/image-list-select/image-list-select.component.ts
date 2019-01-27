import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, AfterViewInit, OnInit } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListSelectComponent implements ControlValueAccessor, OnInit {

  @Input() title = '选择封面：';
  @Input() items: string[] = [];
  @Input() cols = 8;
  @Input() rowHeight = '64px';
  @Input() itemWidth = '80px';
  @Input() useSvgIcon = false;

  // 当前选择的图片
  private _selected: string;
  get selected() {
    return this._selected;
  }
  set selected(sel: string) {
    this._selected = sel;
    // 更新表单
    this.notifyValueChange();
  }
  /**
   * 初始化
   *
   * @memberof ImageListSelectComponent
   */
  ngOnInit() {
    // ngOnInit的执行在registerOnChange注册之前，所以在OnInit中同步改变formcontrol的值并不能emit给外部的form，
    // 使用异步，在registerOnChange注册之后再改变值，或者在ngAfterViewInit中赋值
    setTimeout(() => {
        if (!this._selected) {
          this.selected = this.items[Math.floor(Math.random() * this.items.length)];
        }
      }, 0);
    // // 在ngAfterViewInit中提交变化
    // if (!this._selected) {
    //   this.selected = this.items[Math.floor(Math.random() * this.items.length)];
    // }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of a component's view.
   * It is invoked only once when the view is instantiated.
   * @memberof ImageListSelectComponent
   */
  // ngAfterViewInit() {
  //   // 更新表单
  //   this.notifyValueChange();
  // }
  /**
   * 输入框的值改变时的处理
   *
   * @memberof SelfInputComponent
   */
  notifyValueChange(): void {
    if (this.propagateChange) {
      // 把改变emit给外部
      this.propagateChange(this.selected);
    }
  }
  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => {};

  // 写入控件值
  public writeValue(obj: any) {
    if (obj && obj !== '') {
      this.selected = obj;
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  public validate(c: FormControl) {
    return this.selected ? null : {
      imageListSelect: {
        valid: false,
      },
    };
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  /**
   * 列表元素选择发生改变触发
   *
   * @param {number} i
   * @memberof ImageListSelectComponent
   */
  public onChange(i: number) {
    if (this.items[i] !== this.selected) {
      this.selected = this.items[i];
      // 更新表单
      this.notifyValueChange();
    }
  }

}
