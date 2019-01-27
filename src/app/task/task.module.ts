import { CopyTaskComponent } from './copy-task/copy-task.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListHeaderComponent } from './task-list-header/task-list-header.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { SharedModule } from './../shared/index';
import { NgModule } from '@angular/core';
import { TaskRoutingModule } from './task-routing.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { QuickTaskComponent } from './quick-task/quick-task.component';
@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule,
  ],
  exports: [
    TaskHomeComponent
  ],
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
    TaskListHeaderComponent,
    TaskItemComponent,
    NewTaskComponent,
    CopyTaskComponent,
    NewTaskListComponent,
    QuickTaskComponent
  ],
  entryComponents: [
    NewTaskComponent,
    CopyTaskComponent,
    NewTaskListComponent
  ]
})
export class TaskModule {}
