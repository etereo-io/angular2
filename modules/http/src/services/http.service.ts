import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiUrl } from '../models/api-url.model';
import { BaseReqOptions } from '../models/base-req-options.model';
import { Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class HttpService {

  constructor (private http: Http, private apiUrl: ApiUrl, private baseOptions: BaseReqOptions) {
    console.log(this.apiUrl);
    if (!this.apiUrl || !this.apiUrl.baseUrl) {
      throw new Error('You have to provide a valid api url in the application config json.');
    }
  }

  get (url: string | string[], requestOptions?: any) {
    let endpoint: string = this._createURL(url);

    return this.http
    .get(endpoint, this._createRequestOptions(requestOptions))
    .map((res: Response) => res.json());
  }

  post (url: string | string[], payload: any, requestOptions?: any) {
    let endpoint: string = this._createURL(url);

    return this.http
    .post(endpoint, payload, this._createRequestOptions(requestOptions))
    .map((res: Response) => res.json());
  }

  put (url: string | string[], payload: any, requestOptions?: any) {
    let endpoint: string = this._createURL(url);

    return this.http
    .put(endpoint, payload, this._createRequestOptions(requestOptions))
    .map((res: Response) => res.json());
  }

  head () {

  }

  delete (url: string | string[], requestOptions?: any) {
    let endpoint: string = this._createURL(url);

    return this.http
    .delete(endpoint, this._createRequestOptions(requestOptions))
    .map((res: Response) => res.json());
  }

  options () {

  }

  _createURL (endpoint: string | string[]) : string {
    if (endpoint instanceof Array) {
      endpoint = this._arrayToStringUrl(endpoint);
    }

    let baseUrl = this.apiUrl.baseUrl + (this.apiUrl.baseUrl.slice(-1) !== '/' ? '/' : '') || 'http://localhost:3000/';

    return baseUrl + (endpoint.slice(0, 1) === '/' ? endpoint.slice(1) : endpoint );
  }

  _createRequestOptions (opts: any): RequestOptions {
    return new RequestOptions(_.extend({} , this.baseOptions, opts));

  }

  _arrayToStringUrl (arrayUrl: string[]): string {
    let endpoint: string = '';

    _.each(arrayUrl, (path: string, index: number, collection: Array<string>) => {
        endpoint += path;

        if (index < collection.length - 1) {
          endpoint += '/';
        }
    });

    return endpoint;
  }

}
