import { NgModule, ModuleWithProviders } from '@angular/core';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { TaskListService } from './task-list.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  // providers: [
  //   QuoteService,
  //   ProjectService,
  //   TaskService,
  //   TaskListService
  // ]
})
export class ServicesModule {
  public static forRoot(): ModuleWithProviders {
    // 写成静态方法更加灵活，可以根据不同的调用方提供不同的模块参数，比如routerModule的forRoot和forChild
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService,
        TaskService,
        TaskListService,
        UserService,
        AuthService,
        AuthGuardService
      ]
    };
  }
}
