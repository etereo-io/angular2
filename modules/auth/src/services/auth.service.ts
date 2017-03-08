import { Injectable, Optional, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { HttpService } from '@etereo/http'; // TODO: Change for @etereo/HTTP

import { IAuthService } from './auth.interface.service';
import { User } from '../models/user.interface';
import { AuthEndpoints } from '../models/auth.endpoints';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService implements IAuthService<User> {
  private logged: boolean;
  private userSubject = new BehaviorSubject<User>(null);
  private user: User;

  public user$ = this.userSubject.asObservable();

  constructor (private http: HttpService, private endpoints: AuthEndpoints) {}

  register (user: User) {
    let observable = this.http
    
    .post(this.endpoints.REGISTER, user);

    observable.subscribe((usr: any) => {
      if (usr && usr.id) {
        this.loginSuccess(usr);
      }
    });

    return observable;
  }

  login (user: User) {
    let observable = 
    this.http
    .post(this.endpoints.LOGIN, user);

    observable
    .subscribe((usr: User) => {
      this.loginSuccess(usr);
    });

    return observable;
  }

  logout () {
    let observable = 
    this.http
    .post('logout', {});

    observable
    .subscribe(() => {
      this.logged = false;
      this.userSubject.next(null);
    });

    return observable;
  }

  isAuth (): boolean {
    return this.logged;
  }

  getUser (): User {
    return this.user;
  }

  private loginSuccess (user: User) {
    this.user = user;
    this.logged = true;
    this.userSubject.next(user);
  }

  private logOutSuccess (user: User) {
    this.user = null;
    this.logged = false;
    this.userSubject.next(null);
  }
}
