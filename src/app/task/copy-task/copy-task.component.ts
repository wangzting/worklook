import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { TaskList } from 'src/app/domain/model';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CopyTaskComponent implements OnInit {

  public lists: TaskList[];

  /**
   *Creates an instance of CopyTaskComponent.
   * @param {*} data
   * @param {MatDialogRef<CopyTaskComponent>} dialogRef
   * @memberof CopyTaskComponent
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private dialogRef: MatDialogRef<CopyTaskComponent>
  ) { }

  /**
   *初期处理
   *
   * @memberof CopyTaskComponent
   */
  ngOnInit(): void {
    this.lists = this.data.lists;
  }
}
