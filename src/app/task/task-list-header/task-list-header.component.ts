import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.scss']
})
export class TaskListHeaderComponent implements OnInit {

  @Output() moveAllTasks = new EventEmitter<void>();
  @Output() newTask = new EventEmitter<void>();
  @Output() delAllTask = new EventEmitter<void>();
  @Output() editTask = new EventEmitter<void>();
  @Input() header = '';
  constructor() {

  }
  public ngOnInit() {

  }
  public addNewTask() {
    this.newTask.emit();
  }
  public onMoveAllTasks() {
    this.moveAllTasks.emit();
  }
  public onDelAllTasks() {
    this.delAllTask.emit();
  }
  public onEditList() {
    this.editTask.emit();
  }
}
