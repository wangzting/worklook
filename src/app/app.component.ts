import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _dark = false;

  constructor() {
  }

  get dark() {
    return this._dark;
  }

  switchDarkTheme(dark: boolean) {
    this._dark = dark;
  }
}
