import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
export interface ConfirmDialog {
  title: string;
  content: string;
  confirmAction: string;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  public dialog: ConfirmDialog;

  /**
   *Creates an instance of ConfirmDialogComponent.
   * @param {*} data
   * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
   * @memberof ConfirmDialogComponent
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
    if (this.data.dialog !== undefined || this.data.dialog !== null) {
      this.dialog = this.data.dialog;
    }
  }

  /**
   * 处理事件
   *
   * @param {boolean} result
   * @memberof ConfirmDialogComponent
   */
  public handleAction(result: boolean) {
    this.dialogRef.close(result);
  }
}
