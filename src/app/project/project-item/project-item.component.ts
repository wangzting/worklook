import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { cardAnim } from 'src/app/common/anim/card.anim';
import { Project } from 'src/app/common/domain/model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectItemComponent {

  @Input() item: Project;
  @Output() invite = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';

  constructor() {

  }
  @HostListener('mouseenter')
  public onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  public onMouseLeave() {
    this.cardState = 'out';
  }

  public onInviteClick() {
    this.invite.emit();
  }
  public onEditClick() {
    this.edit.emit();
  }
  public onDeleteClick() {
    this.delete.emit();
  }
}
