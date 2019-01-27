import {
  ActivatedRoute
} from '@angular/router';

import {
  InviteComponent
} from './../invite/invite.component';
import {
  NewProjectComponent
} from './../new-project/new-project.component';
import { Component, Input, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable, range } from 'rxjs';
import { filter, map, reduce, take, switchMap, concat, last } from 'rxjs/operators';
import { slideToRight } from 'src/app/common/anim/router.anim';
import { listAnimation } from 'src/app/common/anim/list.anim';
import { Project } from 'src/app/common/domain/model';
import { ProjectService } from 'src/app/common/services/project.service';
import { ConfirmDialogComponent } from 'src/app/common/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectListComponent implements OnInit {

  public projects: Project[];
  @HostBinding('@routeAnim') state: string;


  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private projectService: ProjectService,
    private router: ActivatedRoute
  ) {

  }
  public ngOnInit(): void {
    // 从路由中取得任务数据
    // TODO Angular在何时开始渲染页面？何时进行变更检测修改页面。
    this.router.data.subscribe(
      (data: {
        projects: Project[]
      }) => {
        this.projects = data.projects;
      }
    );
    this.changeDetectorRef.markForCheck();
  }

  /**
   * 新建项目信息
   *
   * @memberof ProjectListComponent
   */
  public openNewProjectDialog() {
    // 图片stream
    const thumbnails$: Observable < string[] > = this.getThumbnailsObs();
    // 新建dialog，返回dialog的实例
    const dialogRef: MatDialogRef < NewProjectComponent > = this.dialog.open(
      NewProjectComponent, {
        data: {
          projectType: 'create',
          thumbnails: thumbnails$
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        // 这个subscription的生命周期应该是这个函数，每次调用函数结束后要调用unsubscribe比较麻烦，还好这个是单次有作用的，直接take(1)
        // 取得第一次就可以了，这样Observable会自动complete，不用调用unsubscribe
        take(1),
        filter(
          (project: Project) => {
            return !!project;
          }
        ),
        map(
            (project: Project) => {
                return {...project, coverImg: this.buildImgSrc(project.coverImg), members: ['37489e0c-df34-c261-71c4-ce75357e3035']};
            }
        ),
        switchMap(
            (project: Project) => {
                return this.projectService.add(project);
            }
        ),
    // 有2种方式让项目页面更新添加的项目
    // 一是重新取得数据，二是在原来取得的数据基础上直接加一条
    //     concat(
    //         this.projectService.get('1')
    //     ),
    //     last()
    //   )
    //   .subscribe(
    //     (project: Project[]) => {
    //         this.projects = project;
    //     }
    //   );
      ).subscribe(
          (project: Project) => {
            this.projects = [...this.projects, project];
          }
      );
    this.changeDetectorRef.markForCheck();
  }

  /**
   * 邀请组员
   *
   * @memberof ProjectListComponent
   */
  public launchInviteDialog() {
    const dialogRef: MatDialogRef < InviteComponent > = this.dialog.open(InviteComponent);
  }

  /**
   * 编辑项目信息
   *
   * @param {Project} orgProject
   * @memberof ProjectListComponent
   */
  public launchEditDialog(orgProject: Project) {
    // 图片stream
    const thumbnails$: Observable < string[] > = this.getThumbnailsObs();
    // 新建dialog，返回dialog的实例
    const dialogRef: MatDialogRef < NewProjectComponent > = this.dialog.open(
      NewProjectComponent, {
        data: {
            project: orgProject,
            thumbnails: thumbnails$
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        // 这个subscription的生命周期应该是这个函数，每次调用函数结束后要调用unsubscribe比较麻烦，还好这个是单次有作用的，直接take(1)
        // 取得第一次就可以了，这样Observable会自动complete，不用调用unsubscribe
        take(1),
        filter(
          (project: Project) => {
            return !!project;
          }
        ),
        map(
            (project: Project) => {
                return {...project, coverImg: this.buildImgSrc(project.coverImg), id: orgProject.id};
            }
        ),
        switchMap(
            (project: Project) => {
                return this.projectService.update(project);
            }
        ),
      ).subscribe(
          (project: Project) => {
            const index = this.projects.indexOf(orgProject);
            this.projects[index] = project;
          }
      );
    this.changeDetectorRef.markForCheck();
  }
  public launchDeleteDialog(project: Project) {
    const dialogRef: MatDialogRef < ConfirmDialogComponent > =
      this.dialog.open(ConfirmDialogComponent, {
        data: {
            dialog: {
                title: '取得要删除项目吗？',
                content: '删除项目会清空这个项目包含的所有任务，请谨慎！！！',
                confirmAction: '删除'
            }
        }
      });
    dialogRef.afterClosed()
        .pipe(
            take(1),
            filter(R => R),
            switchMap(
                (_) => {
                    return this.projectService.del(project);
                }
            )
        ).subscribe(
            (delProject: Project) => {
                this.projects = this.projects.filter(
                    (pro: Project) => {
                        return pro.id !== delProject.id;
                    }
                );
            }
        );
  }

  /**
   * 取得图片
   *
   * @private
   * @returns {Observable<string[]>}
   * @memberof ProjectListComponent
   */
  private getThumbnailsObs(): Observable < string[] > {
    return range(0, 40)
      .pipe(
        map(
          (i: number) => {
            // 取得的是压缩的图片
            return `./assets/img/covers/${i}_tn.jpg`;
          }
        ),
        reduce(
          (arrs: string[], cur: string) => {
            return [...arrs, cur];
          },
          []
        )
      );
  }

  /**
   * 把取得的压缩的图片转换为正常的图片（dialog中图片很多，并且小，应该使用压缩的图片，但是项目页面应该使用正常的图片）
   *
   * @private
   * @param {string} img
   * @returns {string}
   * @memberof ProjectListComponent
   */
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
