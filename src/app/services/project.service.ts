import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, mergeMap, mapTo, switchMap, count, tap } from 'rxjs/operators';
import { Project } from '../domain/model';
import { ObserveType, ResponseType } from './http.service';
@Injectable()
export class ProjectService {

  private readonly domain = 'projects';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   *Creates an instance of ProjectService.
   * @param {HttpClient} http
   * @param {*} config
   * @memberof ProjectService
   */
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG')
    private config: any
  ) {

  }


  /**
   * rest API规定添加元素使用post方法
   * 添加项目
   * @param {Project} project
   * @memberof ProjectService
   */
  public add(project: Project): Observable<Project> {
    // 自动添加id
    project.id = null;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
    };
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post<Project>(uri, JSON.stringify(project), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Project>) => {
            return res.body;
          }
        )
      );

  }

  /**
   * rest API规定更新元素使用put方法，但是使用put更新时会更新全部的数据，如果只想更新其中的一部分，使用patch
   * 更新项目
   * @param {Project} project
   * @returns {Observable<Project>}
   * @memberof ProjectService
   */
  public update(project: Project): Observable<Project> {
    // restful API 默认使用id来进行路由
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const httpOptions = {
      headers: this.headers,
      observe: ObserveType.Response,
      responseType: ResponseType.Json,
    };
    // 使用patch可以指定更新的数据，数据名称必须好API中的数据名称相同
    const toUpdate = {
      name: project.name,
      coverImg: project.coverImg,
      desc: project.desc
    };
    return this.http
      // rest API规定更新元素使用put方法，但是使用put更新时会更新全部的数据，如果只想更新其中的一部分，使用patch
      .patch<Project>(uri, JSON.stringify(toUpdate), httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Project>) => {
            return res.body;
          }
        )
      );
  }

  /**
	 * rest API规定删除元素使用delete方法，并且删除时要考虑级连删除（删除项目时要把项目中的任务列表和任务也一并删除）
   * jsonserver只支持往下一级进行级连删除，即删除项目时，会把项目中的任务列表删除，但不会删除任务列表中的任务
	 * 删除项目
	 * @param {Project} project
	 * @returns {Observable<Project>}
	 * @memberof ProjectService
	 */
  public del(project: Project): Observable<Project> {
    // 考虑删除一个项目时，这个项目对应的任务列表也要删除
    // 如果这个项目中不包含任何任务列表时
    const taskLists = project.taskLists ? project.taskLists : [];
    const deltask$ = from(taskLists).pipe(
        // 删除任务列表中的所有任务
        mergeMap(
          listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)
        ),
        count()
      );
    // 删除完项目中的所有任务后，再删除项目
    return deltask$.pipe(
      // 再删除项目，删除项目时jsonServer进行级连删除，把项目中的任务列表也一并删除了
      switchMap(
        _ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)
      ),
      // 做删除操作时返回值是没有意义的，但是为了统一，所有函数都返回了Project类型，这里把传递进来的Project返回回去
      mapTo(project)
    );
  }

  /**
   * rest API规定删除元素使用get方法
   * 根据成员ID取得所有项目
   * @param {string} userId
   * @returns {Observable<Project>}
   * @memberof ProjectService
   */
  get(userId: string): Observable<Project[]> {
    // 可以把参数用?的形式传递过去，但是这样参数是不安全的（即不能进行安全化处理），放在params中比较好
    const uri = `${this.config.uri}/${this.domain}`;
    // observe有3种值，分别为
    // body, 返回Observable<T>
    // response，返回Observable<HttpResponse<T>>
    // events, 返回Observable<HttpEvent<T>>
    // HttpEvent包含HttpSentEvent | HttpHeaderResponse | HttpResponse<T> | HttpProgressEvent | HttpUserEvent<T>;
    // 可以原来监听http的过程，
    // body => response => events范围越来越大，得到的信息也越来越具体。
    // responseType有4种值，分别为
    // json,默认类型
    // text,string
    // blob,二进制对象
    // arraybuffer,es6新加的类型
    // TODO blob和arraybuffer的使用场景
    const httpOptions = {
        headers: this.headers,
        // 如何设置observe和responseType参见https://www.cnblogs.com/wangtingnoblog/p/10322483.html
        observe: ObserveType.Response,
        responseType: ResponseType.Json,
        // 查询参数，会被解析成?members_like=1，可以给HttpParams传递参数HttpParamsOptions（支持数组，查询字符串），
        // HttpParams是不可修改的，只能通过set返回新的HttpParams
        params: (new HttpParams()).set('members_like', userId),
    };
    return this.http
      .get<Project[]>(uri, httpOptions)
      .pipe(
        map(
          (res: HttpResponse<Project[]>) => {
            return res.body;
          }
        )
      );
  }
}



