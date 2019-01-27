import { SelfValidators } from './../../common/validators/validators';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Quote } from 'src/app/common/domain/model';
import { QuoteService } from 'src/app/common/services/quote.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  public quote: Quote =     {
    'id': '0',
    'cn': '我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。',
    'en': `I suddenly feel myself like a doll,acting all kinds of joys and sorrows.
      There are lots of shining silvery thread on my back,controlling all my action.`,
    'pic': '/assets/img/quotes/0.jpg'
  };

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService
  ) {
  }

  /**
   *
   *
   * @memberof LoginComponent
   */
  public ngOnInit() {
    this.form = this.fb.group(
      {
        email: ['', Validators.compose([SelfValidators.requireInput()])],
        password: ['', Validators.compose([SelfValidators.requireInput(), SelfValidators.minLength(6)])],
      }
    );

    this.quoteService.getQuote().subscribe(
      (quote: Quote) => {
        this.quote = quote;
      }
    );

  }


  /**
   *
   * 表单处理事件
   * @param {*} {value, valid}
   * @param {Event} ev
   * @memberof LoginComponent
   */
  onSubmit(form, ev: Event) {
    ev.preventDefault();
    console.log(form);
    // console.log(valid)
  }
}
