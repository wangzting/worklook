import { SharedModule } from './../shared/index';
import { NgModule } from '@angular/core';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectResolverService } from './project-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
  ],
  declarations: [
    ProjectListComponent,
    NewProjectComponent,
    InviteComponent,
    ProjectItemComponent
  ],
  entryComponents: [NewProjectComponent, InviteComponent],
  exports: [ProjectListComponent],
  providers: [
    ProjectResolverService
  ]
})
export class ProjectModule {

}
