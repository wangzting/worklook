import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Project } from '../common/domain/model';
import { ProjectService } from '../common/services/project.service';

@Injectable()
export class ProjectResolverService implements Resolve<Project[]> {


  /**
   *Creates an instance of ProjectResolverService.
   * @param {ProjectService} projectService
   * @memberof ProjectResolverService
   */
  constructor(
    // 注入project的httpService
    private projectService: ProjectService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project[]> {
    // 要么从url中取得，要么从当前的用户中取得
    const userId = '1';
    return this.projectService
      .get(userId)
      .pipe(
        take(1)
      );
  }
}
