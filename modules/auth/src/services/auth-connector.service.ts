import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IAuthConnectorService } from './auth-connector.interface.service';
import { HttpService } from '@etereo/http';

import { AuthEndpoints } from '../models/auth.endpoints';

@Injectable()
export class AuthConnectorService<U, C> implements IAuthConnectorService<U, C> {
  constructor (private http: HttpService, private endpoints: AuthEndpoints) {}
  
  register(user: U): Observable<U> {
    return this.http
    .post(this.endpoints.REGISTER, user);
  }

  login (user: U): Observable<C> {
    return this.http
    .post(this.endpoints.LOGIN, user);
  }

  logout (): Observable<any> {
    return this.http
    .post(this.endpoints.LOGOUT, {});
  }

  me (credentials?: C): Observable<any> {
    return this.http
    .get(this.endpoints.ME);
  }
}