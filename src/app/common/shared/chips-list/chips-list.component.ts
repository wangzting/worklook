import { UserService } from './../../services/user.service';
import { SelfForm } from './../../implements/selfForm';
import { FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { User } from '../../domain/model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-chips-list',
    templateUrl: './chips-list.component.html',
    styleUrls: ['./chips-list.component.scss']
})
export class ChipsListComponent implements OnInit, ControlValueAccessor, SelfForm {

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    // 是否是多个值
    @Input() multiple = true;
    @Input() label = '添加/修改成员';
    @Input() placeholderText = '请输入成员 email';

    // 表单控件
    public forms: FormGroup;

    // 与外部表单直接相关的值
    private _items: User[] = [];

    get items(): User[] {
        return this._items;
    }
    set items(value: User[]) {
        this._items = value;
        this.itemsChange();
    }
    // 候选项

    memberResults = [
        {
            'password': 'wp123456',
            'name': '王芃',
            'avatar': 'avatars:svg-1',
            'email': 'wpcfan@163.com',
            'id': '37489e0c-df34-c261-71c4-ce75357e3035',
            'projectIds': [
                'Sk2HaTagb',
                'Hya1moGb-'
            ],
            'roleIds': [
                0,
                1,
                2
            ]
        },
        {
            'password': 'Ls123456',
            'name': '李四',
            'avatar': 'avatars:svg-2',
            'email': 'lisi@163.com',
            'id': 'BkkDvwee-',
            'projectIds': [
                'Sk2HaTagb'
            ],
            'roleIds': [
                1
            ]
        },
        {
            'password': 'Ls123456',
            'name': '李三',
            'avatar': 'avatars:svg-2',
            'email': 'lisi@163.com',
            'id': 'BkkDvwee-',
            'projectIds': [
                'Sk2HaTagb'
            ],
            'roleIds': [
                1
            ]
        }
    ];
    memberResults$: Observable<User[]>;

    // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
    // 由框架注册，然后我们使用它把变化发回表单
    // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
    private propagateChange = (_: any) => { };
    private propagateTouch = (_: any) => { };

    /**
     *Creates an instance of ChipsListComponent.
     * @param {FormBuilder} fb
     * @memberof ChipsListComponent
     */
    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) {
        // 初始化表单
        this.initForm();
    }

    /**
     * 初始化表单
     *
     * @private
     * @memberof ChipsListComponent
     */
    private initForm() {
        this.forms = this.fb.group({
            memberSearch: ['']
        });
    }

    ngOnInit() {
        this.memberResults$ = this.searchUsers(this.forms.get('memberSearch').valueChanges);
    }

    /**
     * 表单内部值改变
     *
     * @private
     * @memberof ChipsListComponent
     */
    private itemsChange() {
        // 把值发送给外部表单
        this.propagateChange(this.items);
    }
    /**
     * 根据输入检索存在的用户
     *
     * @param {Observable<string>} obs
     * @returns {Observable<User[]>}
     * @memberof ChipsListComponent
     */
    public searchUsers(obs: Observable<string>): Observable<User[]> {
        return obs.pipe(
            startWith(''),
            debounceTime(300),
            distinctUntilChanged(),
            filter(s => s && s.length > 1),
            switchMap(str => this.userService.searchUsers(str))
        );

    }

    /**
     * 设置初始值
     * 把form表单的值设置给控件
     * @param {User[]} obj
     * @memberof ChipsListComponent
     */
    public writeValue(obj: User[]) {
        if (obj && this.multiple) {
            const userEntities = obj.reduce((entities, user) => {
                return { ...entities, [user.id]: user };
            }, {});
            if (this.items) {
                const remaining = this.items.filter(item => !userEntities[item.id]);
                this.items = [...remaining, ...obj];
            }
        } else if (obj && !this.multiple) {
            this.items = [...obj];
        }
    }

    /**
     * 当表单控件值改变时，函数 fn 会被调用
     * 这也是我们把变化 emit 回表单的机制
     * @param {*} fn
     * @memberof ChipsListComponent
     */
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    /**
     * 把touch事件发送给form表单
     *
     * @param {*} fn
     * @memberof ChipsListComponent
     */
    public registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }

    /**
     * 输入属性check
     *
     * @memberof ChipsListComponent
     */
    public inputCheck() {

    }
    displayUser(user: User): string {
        return user ? user.name : '';
    }

    /**
     * 选择候选项中的值
     *
     * @param {User} user
     * @returns
     * @memberof ChipsListComponent
     */
    handleMemberSelection(user: User) {
        // 选中的值已经被选择
        if (this.items.map(u => u.id).indexOf(user.id) !== -1) {
            return;
        }
        // 如果是多个值
        if (this.multiple) {
            this.items = [...this.items, user];
        } else {
            // 是单个值
            this.items = [user];
        }
        // 把选中的值反应到输入框中
        this.forms.get('memberSearch').setValue(user.name);
    }
}
