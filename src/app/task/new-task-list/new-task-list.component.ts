import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewTaskListComponent implements OnInit {
  public title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
  }
  public onClick() {

  }
}
