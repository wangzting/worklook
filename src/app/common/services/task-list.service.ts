import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TaskList } from '../domain/model';
import { ObserveType, ResponseType } from './http.service';

import { Observable } from 'rxjs/Observable';
import { map, mapTo, reduce, concat } from 'rxjs/operators';
@Injectable()
export class TaskListService {

  private readonly domain = 'tasklists';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   *Creates an instance of TaskListService.
   * @param {HttpClient} http
   * @param {*} config
   * @memberof TaskListService
   */
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG')
    private config: any
  ) {

  }


  /**
   * rest API规定添加元素使用post方法
   * 添加任务列表
   * @param {tasklist} tasklist
   * @memberof TasklistService
   */
  public add(tasklist: TaskList): Observable<TaskList> {
    // 自动添加id
    tasklist.id = null;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
    };
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post<TaskList>(uri, JSON.stringify(tasklist), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<TaskList>) => {
            return res.body;
          }
        )
      );

  }

  /**
   * rest API规定更新元素使用put方法，但是使用put更新时会更新全部的数据，如果只想更新其中的一部分，使用patch
   * 更新任务列表
   * @param {tasklist} tasklist
   * @returns {Observable<tasklist>}
   * @memberof TasklistService
   */
  public update(tasklist: TaskList): Observable<TaskList> {
    // restful API 默认使用id来进行路由
    const uri = `${this.config.uri}/${this.domain}/${tasklist.id}`;
    // 使用patch可以指定更新的数据，数据名称必须好API中的数据名称相同
    const toUpdate = {
      name: tasklist.name
    };
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
    };
    return this.http
      // rest API规定更新元素使用put方法，但是使用put更新时会更新全部的数据，如果只想更新其中的一部分，使用patch
      .patch<TaskList>(uri, JSON.stringify(toUpdate), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<TaskList>) => {
            return res.body;
          }
        )
      );
  }

  /**
	 * rest API规定删除元素使用delete方法，并且删除时要考虑级连删除（删除项目时要把项目中的任务也一并删除）
	 * 删除项目
	 * @param {tasklist} tasklist
	 * @returns {Observable<tasklist>}
	 * @memberof TasklistService
	 */
  public del(tasklist: TaskList): Observable<TaskList> {
    // 考虑删除一个任务列表时，这个任务列表对应的任务也要删除，jsonServer只支持往上一级进行删除，这里只要把删除任务列表
    // 删除了，列表下的任务也会被级连删除掉
    const uri = `${this.config.uri}/${this.domain}/${tasklist.id}`;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
    };
    return this.http
      .delete(uri, httpOptions)
      .pipe(
        mapTo(tasklist)
      );
  }

  /**
   * rest API规定删除元素使用get方法
   * 根据项目ID取得所有任务列表
   * @param {string} userId
   * @returns {Observable<tasklist>}
   * @memberof TasklistService
   */
  public get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
      params: (new HttpParams({fromString: `projectId=${projectId}`}))
    };
    return this.http
      .get<TaskList[]>(uri, httpOptions)
      .pipe(
        map(
          (res: HttpResponse<TaskList[]>) => {
            return res.body;
          }
        )
      );
  }

  /**
   *  drog drop 任务列表时的数据交互。
   *
   * @param {TaskList} src
   * @param {TaskList} target
   * @returns {Observable<TaskList[]>}
   * @memberof TaskListService
   */
  public swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    // drag的URL
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}}`;
    // drop的URL
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}}`;
    // drag drop的原理就是交换任务列表的order
    const drag$ = this.http
      // 把drag的任务列表的order设置成drop的任务列表的order（TODO 问题在于order应该有唯一的限制）
      .patch<TaskList>(dragUri, JSON.stringify({order: target.order}), {headers: this.headers});
    const drop$ = this.http
      .patch<TaskList>(dropUri, JSON.stringify({order: src.id}), {headers: this.headers});
    // 顺序执行drag$ 和 drop$
    const concat$: Observable<TaskList> = drag$.pipe(
      concat(drop$)
    );
    return concat$
      .pipe(
        // 把数据合并成数组
        reduce(
          (arrs: TaskList[], list: TaskList) => {
            return [...arrs, list];
          },
          []
        )
    );
  }
}

