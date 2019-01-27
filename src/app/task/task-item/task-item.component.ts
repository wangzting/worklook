import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { itemAnim } from 'src/app/common/anim/item.anim';
import { TaskVM } from 'src/app/common/domain/model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TaskItemComponent implements OnInit {

  @Output() taskClick = new EventEmitter<void>();
  @Input() item: TaskVM;

  public widerPriority = 'out';

  avatar: string;

  constructor() {

  }
  public ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }
  public itemClicked() {
    this.taskClick.emit();
  }
  public onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }
  @HostListener('mouseenter')
  public onMouseEnter() {
    this.widerPriority = 'in';
  }
  @HostListener('mouseleave')
  public onMouseLeave() {
    this.widerPriority = 'out';
  }
}
