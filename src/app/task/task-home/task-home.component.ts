import { NewTaskListComponent } from './../new-task-list/new-task-list.component';
import { CopyTaskComponent } from './../copy-task/copy-task.component';
import { NewTaskComponent } from './../new-task/new-task.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { slideToRight } from 'src/app/anim/router.anim';
import { Task } from 'src/app/domain/model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state: string;

  lists = [
    {
      name: '待办',
      projectId: 'Sk2HaTagb',
      order: 1,
      id: 'BkenST66lb',
      tasks: [{
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: true,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: new Date(),
        priority: 3,
        remark: '',
        reminder: null,
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      },
      {
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: null,
        priority: 1,
        remark: '',
        reminder: '2017-07-18T16:00:00.000Z',
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      }]
    },
    {
      name: '已完成',
      projectId: 'Sk2HaTagb',
      order: 3,
      id: 'SkG3Ba6Tgb',
      tasks: [{
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: new Date(),
        priority: 2,
        remark: '',
        reminder: null,
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      },
      {
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: null,
        priority: 1,
        remark: '',
        reminder: null,
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      }]

    },
    {
      name: '待办',
      projectId: 'Hya1moGb-',
      order: 1,
      id: 'BylTyXiM-b',
      tasks: [{
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: new Date(),
        priority: 1,
        remark: '',
        reminder: '2017-07-18T16:00:00.000Z',
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      },
      {
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: null,
        priority: 3,
        remark: '',
        reminder: null,
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      }]
    },
    {
      name: '进行中',
      projectId: 'Hya1moGb-',
      order: 2,
      id: 'BkWpk7jGZb',
      tasks: [{
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: new Date(),
        priority: 2,
        remark: '',
        reminder: null,
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      },
      {
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: null,
        priority: 3,
        remark: '',
        reminder: null,
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      }]
    },
    {
      name: '已完成',
      projectId: 'Hya1moGb-',
      order: 3,
      id: 'H1fTyXjMWW',
      tasks: [{
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: new Date(),
        priority: 2,
        remark: '',
        reminder: '2017-07-18T16:00:00.000Z',
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      },
      {
        taskListId: 'BkWpk7jGZb',
        desc: '什么情况啊？',
        completed: false,
        ownerId: '37489e0c-df34-c261-71c4-ce75357e3035',
        participantIds: [],
        dueDate: null,
        priority: 1,
        remark: '',
        reminder: null,
        createDate: '2017-06-15T12:03:36.290Z',
        id: 9
      }]
    }
  ];

  constructor(
    private dialog: MatDialog
  ) {

  }
  public ngOnInit() {

  }
  test() {
    console.log('eddd');
  }
  public handleAddTask(listId: string) {
    this.dialog.open(NewTaskComponent);
  }
  public handleMoveList(listId: string) {
    const dialogRef: MatDialogRef<CopyTaskComponent> = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }
  public handleUpdateTask(task: Task) {
    const dialogRef: MatDialogRef<NewTaskComponent> = this.dialog.open(NewTaskComponent, { data: { task: task }});
  }
  public handleDelList(listId: string) {
    const dialogRef: MatDialogRef<ConfirmDialogComponent> =
      this.dialog.open(ConfirmDialogComponent, {data: {lists: this.lists, title: '删除任务？'}});
  }
  public handleEditList(listId: string) {
    const dialogRef: MatDialogRef<NewTaskListComponent> =
      this.dialog.open(NewTaskListComponent, {data: {lists: this.lists, title: '修改列表'}});
  }
  public openNewList() {
    const dialogRef: MatDialogRef<NewTaskListComponent> =
    this.dialog.open(NewTaskListComponent, {data: {lists: this.lists, title: '新建列表'}});
  }


  /**
   *
   *  快速新建任务的处理函数
   * @param {string} desc
   * @memberof TaskHomeComponent
   */
  public handleQuickTask(desc: string) {
    console.log(desc);
  }
}
