import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, filter, reduce } from 'rxjs/operators';
import { User, Project } from '../domain/model';
import { ObserveType, ResponseType } from './http.service';

@Injectable()
export class UserService {

    private readonly domain = 'users';

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    /**
     *Creates an instance of UserService.
     * @param {*} config
     * @param {HttpClient} http
     * @memberof UserService
     */
    constructor(
        @Inject('BASE_CONFIG') private config,
        private http: HttpClient) {
    }


    /**
     * 通过email检索用户
     *
     * @param {string} search
     * @returns {Observable<User[]>}
     * @memberof UserService
     */
    searchUsers(search: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        const httpOptions = {
            observe: ObserveType.Body,
            responseType: ResponseType.Json,
            headers: this.headers,
            params: new HttpParams({fromString: `email_like=${search}`})
        };
        return this.http.get<User[]>(uri, httpOptions);
    }

    /**
     * 取得项目的所有成员
     *
     * @param {string} projectId
     * @returns {Observable<User[]>}
     * @memberof UserService
     */
    getUsersByProject(projectId: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        const httpOptions = {
            observe: ObserveType.Body,
            responseType: ResponseType.Json,
            headers: this.headers,
            // jsonserver的小技巧，数据是projectIds，如果想看这个数组中是否包含某个projectId，可以把s去掉
            params: new HttpParams({fromString: `projectId=${projectId}`})
        };
        return this.http.get<User[]>(uri, httpOptions);
    }

    /**
     * 给用户添加项目
     *
     * @param {User} user
     * @param {string} projectId
     * @returns {Observable<User>}
     * @memberof UserService
     */
    addProjectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = (user.projectIds) ? user.projectIds : [];
        const httpOptions = {
            observe: ObserveType.Body,
            responseType: ResponseType.Json,
            headers: this.headers,
        };
        return this.http
            .patch<User>(uri, JSON.stringify({ projectIds: [...projectIds, projectId] }), httpOptions);
    }

    /**
     * 给定用户，删除用户下的某个项目
     *
     * @param {User} user
     * @param {string} projectId
     * @returns {Observable<User>}
     * @memberof UserService
     */
    removeProjectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = (user.projectIds) ? user.projectIds : [];
        const index = projectIds.indexOf(projectId);
        const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
        const httpOptions = {
            observe: ObserveType.Body,
            responseType: ResponseType.Json,
            headers: this.headers,
        };
        return this.http
            .patch<User>(uri, JSON.stringify({ projectIds: toUpdate }), httpOptions);
    }

    /**
     * 批量更新项目中的成员
     *
     * @param {Project} project
     * @returns {Observable<User[]>}
     * @memberof UserService
     */
    batchUpdateProjectRef(project: Project): Observable<User[]> {
        const projectId = project.id;
        const memberIds = project.members ? project.members : [];
        return from(memberIds)
            .pipe(
                // 取得项目中所有成员
                switchMap(
                    (id: string) => {
                        const uri = `${this.config.uri}/${this.domain}/${id}`;
                        return this.http.get<User>(uri);
                    }
                ),
                // 过滤掉已经在项目中的用户
                filter(user => user.projectIds.indexOf(projectId) < 0),
                // 把用户添加到项目中
                switchMap(user => this.addProjectRef(user, projectId)),
                // 返回User[]数组
                reduce((users: User[], curr: User) => [...users, curr], [])
            );

    }
}
