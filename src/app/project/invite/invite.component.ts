import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InviteComponent {

  items = [
    {
      id: '1',
      name: 'zzz'
    },
    {
      id: '2',
      name: 'aaa'
    },
  ]
  constructor() {

  }
  public displayUser(user: {id: string, name: string}) {
    return user ? user.name : '';
  }
}
