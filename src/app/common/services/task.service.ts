import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { Injectable, Inject } from '@angular/core';

import { Task, TaskList } from '../domain/model';
import { ObserveType, ResponseType } from './http.service';

import { Observable, from } from 'rxjs';

import { map, mergeMap, mapTo, switchMap, count, reduce } from 'rxjs/operators';
@Injectable()
export class TaskService {

  private readonly domain = 'tasks';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  /**
   *Creates an instance of TaskService.
   * @param {Http} http
   * @param {*} config
   * @memberof TaskService
   */
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG')
    private config: any
  ) {

  }


  /**
   * rest API规定添加元素使用post方法
   * 添加任务
   * @param {Task} task
   * @memberof TaskService
   */
  public add(task: Task): Observable<Task> {
    // 自动添加id
    // task.id = null;
    // 指定添加的任务
    const toAdd = {
      taskListId: task.taskListId,
      desc: task.desc,
      completed: task.completed,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      priority: task.priority,
      remark: task.remark,
      reminder: task.reminder,
      createDate: task.createDate
    };
    const uri = `${this.config.uri}/${this.domain}`;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
    };
    return this.http
      .post<Task>(uri, JSON.stringify(toAdd), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Task>) => {
            return res.body;
          }
        )
      );
  }

  /**
   * rest API规定更新元素使用put方法，但是使用put更新时会更新全部的数据，如果只想更新其中的一部分，使用patch
   * 更新任务
   * @param {Task} task
   * @returns {Observable<Task>}
   * @memberof TaskService
   */
  public update(task: Task): Observable<Task> {
    // restful API 默认使用id来进行路由
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    // 使用patch可以指定更新的数据，数据名称必须好API中的数据名称相同
    const toUpdate = {
      desc: task.desc,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      reminder: task.reminder,
      priority: task.priority,
      remark: task.remark
    };
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
    };
    return this.http
      // rest API规定更新元素使用put方法，但是使用put更新时会更新全部的数据，如果只想更新其中的一部分，使用patch
      .patch<Task>(uri, JSON.stringify(toUpdate), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Task>) => {
            return res.body;
          }
        )
      );
  }

  /**
	 * rest API规定删除元素使用delete方法
	 * 删除任务
	 * @param {Task} task
	 * @returns {Observable<Task>}
	 * @memberof TaskService
	 */
  public del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      .delete(uri)
      .pipe(
        mapTo(task)
      );
  }

  /**
   * rest API规定取得元素使用get方法
   * 根据任务列表ID取得所有任务
   * @param {string} userId
   * @returns {Observable<Task>}
   * @memberof TaskService
   */
  public get(taskListId: string): Observable<Task[]> {
    // 可以把参数用?的形式传递过去，但是这样参数是不安全的（即不能进行安全化处理），放在params中比较好
    const uri = `${this.config.uri}/${this.domain}`;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
      params: new HttpParams({fromObject: {taskListId: taskListId}})
    };
    return this.http
      // restful API 支持like搜索
      .get<Task[]>(uri, httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Task[]>) => {
            return res.body;
          }
        )
      );
  }

  /**
   * 取得多个任务列表的所有任务
   *
   * @param {TaskList[]} taskLists
   * @returns {Observable<Task[]>}
   * @memberof TaskService
   */
  public getByLists(taskLists: TaskList[]): Observable<Task[]> {
    return from(taskLists)
      .pipe(
        mergeMap(
          (taskList: TaskList): Observable<Task[]> => {
            return this.get(taskList.id);
          }
        ),
        reduce(
          (arrs: Task[], cur: Task[]): Task[] => {
            return [...arrs, ...cur];
          }
        )
      );
  }

  /**
   * 移动任务列表中的任务
   *
   * @param {string} taskId
   * @param {string} taskListId
   * @returns {Observable<Task>}
   * @memberof TaskService
   */
  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json
    };
    return this.http
      .patch<Task>(uri, JSON.stringify({taskListId: taskListId}), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Task>) => {
            return res.body;
          }
        )
      );
  }

  /**
   * 移动任务列表中的所有任务
   *
   * @param {*} srcListId
   * @param {*} targetListId
   * @returns {Observable<Task[]>}
   * @memberof TaskService
   */
  public moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .pipe(
        mergeMap(tasks => from(tasks)),
        mergeMap(task => this.move(task.id, targetListId)),
        reduce(
          (arrTasks: Task[], t: Task) => {
            return [...arrTasks, t];
          },
          []
        )
      );
  }

  /**
   *
   *
   * @param {Task} task
   * @returns {Observable<Task>}
   * @memberof TaskService
   */
  public complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json
    };
    return this.http
      .patch<Task>(uri, JSON.stringify({completed: !task.completed}), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Task>) => {
            return res.body;
          }
        )
      );
  }

}
