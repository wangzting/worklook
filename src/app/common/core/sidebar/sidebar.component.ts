import { Component, Output, EventEmitter } from '@angular/core';
import {getDate} from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() navClick = new EventEmitter<void>();

  public today = 'day';

  constructor() {
    this.today = `day${getDate(new Date())}`;
  }

  public onNavClick() {
    this.navClick.emit();
  }

}
