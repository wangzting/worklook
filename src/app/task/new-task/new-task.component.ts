import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewTaskComponent implements OnInit {
  priorities = [
    {
      label: '紧急',
      value: '1'
    },
    {
      label: '重要',
      value: '2'
    },
    {
      label: '普通',
      value: '3'
    },
  ]
  public title: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
  ) { }

  ngOnInit(): void {
    this.title = this.data.task ? '修改任务' : '新建任务';
  }
}
