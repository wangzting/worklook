import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Quote } from '../domain/model';
import { ObserveType, ResponseType } from './http.service';

@Injectable()
export class QuoteService {

  /**
   *Creates an instance of QuoteService.
   * @param {HttpClient} http
   * @param {*} config
   * @memberof QuoteService
   */
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG')
    private config: any
    ) {
  }

  /**
   * 随机取得Quote
   *
   * @returns {Observable<Quote>}
   * @memberof QuoteService
   */
  getQuote(): Observable<Quote> {
    // 随机返回一个Quote
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    // 参见https://www.cnblogs.com/wangtingnoblog/p/10322483.html
    const httpOptions = {
      observe: ObserveType.Response,
      responseType: ResponseType.Json
    };
    return this.http
      .get<Quote>(uri, httpOptions)
      .pipe(
      map(
        (res: HttpResponse<Quote>) => {
          return res.body;
        }
      )
    );
  }

}
