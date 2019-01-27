import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Project } from '../domain/model';
import { ProjectService } from '../services/project.service';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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
