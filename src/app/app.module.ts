import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { ChipsListComponent } from './common/shared/chips-list/chips-list.component';
import { SharedModule } from './common/shared';
import { CoreModule } from './common/core';

@NgModule({
  declarations: [
    AppComponent,
    ChipsListComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
