import { SelfValidators } from '../../common/validators/validators';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public items: string[];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([SelfValidators.requireInput()])],
      email: ['', Validators.compose([SelfValidators.requireInput()])],
      passwd: this.fb.group(
        {
          password: ['', Validators.compose([SelfValidators.minAndMaxLength(4, 8)])],
          repeat: ['', Validators.compose([SelfValidators.minAndMaxLength(4, 8)])]
        },
        {
          validator: Validators.compose([SelfValidators.equalInGroup()])
        },
      ),
      avatar: [],
      dateOfBirth: ['']
    });
  }

  ngOnInit() {
    this.items = Array.from(Array(16), (v, idx) => {
      return `avatars:svg-${idx + 1}`;
    });
  }


  /**
   *表单处理事件
   *
   * @param {FormGroup} form
   * @param {Event} ev
   * @memberof RegisterComponent
   */
  public onSubmit(form: FormGroup, ev: Event) {
    console.log(form);
  }
  test(v) {
    console.log(v);
  }
}
