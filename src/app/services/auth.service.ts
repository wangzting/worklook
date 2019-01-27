import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Auth, User } from '../domain/model';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ObserveType, ResponseType } from './http.service';

/**
 * 认证服务主要用于用户的注册和登录功能
 */
@Injectable()
export class AuthService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private readonly domain = 'users';
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
        '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    /**
     * 构造函数用于注入服务的依赖以及进行必要的初始化
     *
     * @param http 注入Http
     * @param config 注入基础配置
     */
    constructor(private http: HttpClient,
        @Inject('BASE_CONFIG') private config) {
    }

    /**
     * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
     *
     * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
     */
    public register(user: User): Observable<Auth> {
        const uri = `${this.config.uri}/${this.domain}`;

        const httpOptions = {
            observe: ObserveType.Body,
            responseType: ResponseType.Json,
            headers: this.headers,
            params: new HttpParams({fromString: `email=${user.email}`})
        };

        return this.http
            .get<User[]>(uri, httpOptions)
            .pipe(
                switchMap(
                    (res: User[]) => {
                    if (res.length > 0) {
                        // throw 'username existed';
                    }
                    return this.http.post<User>(uri, JSON.stringify(user), { headers: this.headers })
                        .pipe(
                            map(r => ({ token: this.token, r: user }))
                        );
                })
            );
    }

    /**
     * 使用用户名和密码登录
     *
     * @param username 用户名
     * @param password 密码（明文），服务器会进行加密处理
     */
    public login(email: string, password: string): Observable<Auth> {
        const uri = `${this.config.uri}/${this.domain}`;
        const httpOptions = {
            observe: ObserveType.Body,
            responseType: ResponseType.Json,
            headers: this.headers,
            params: new HttpParams().set('email', email).set('password', password)
        };
        return this.http
            .get<User[]>(uri, httpOptions)
            .pipe(
                map(res => {
                    if (res.length === 0) {
                        // throw 'Login Failed';
                    }
                    return {
                        token: this.token,
                        user: res[0]
                    };
                })
            );
    }
}
