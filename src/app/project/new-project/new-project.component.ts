import { SelfValidators } from './../../common/validators/validators';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import { Project } from 'src/app/common/domain/model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewProjectComponent implements OnInit {

  // 画面名称
  public title: string;

  // FormGroup
  public forms: FormGroup;

  // 图片
  public items$: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder
  ) {
    this.forms = this.fb.group({
      name: ['', Validators.compose([SelfValidators.requireInput()])],
      desc: [''],
      coverImg: ['', Validators.compose([SelfValidators.requireInput()])]
    });
  }

  /**
   * 初期化
   *
   * @memberof NewProjectComponent
   */
  public ngOnInit() {

    // 新建项目
    if (this.data.projectType && this.data.projectType === 'create') {
        this.title =  '新建项目';
    // 编辑项目
    } else {
        this.title =  '编辑项目';
        this.forms.get('name').setValue(this.data.project.name);
        this.forms.get('desc').setValue(this.data.project.desc);
        this.forms.get('coverImg').setValue(this.data.project.coverImg);
    }

    // 图片
    this.items$ = this.data.thumbnails;
  }

  /**
   * 保存
   *
   * @memberof NewProjectComponent
   */
  public onClick() {
    this.dialogRef.close(this.forms.value as Project);
  }
}
