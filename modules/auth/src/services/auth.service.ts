import { Injectable, Optional, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

import { SessionStorage } from '@etereo/core';

import { AuthConnectorService } from './auth-connector.service';
import { User } from '../models/user.interface';
import { Credentials } from '../models/credentials.interface';

@Injectable()
export class AuthService {
  private logged: boolean;
  private userSubject = new AsyncSubject<User>();
  private user: User;

  @SessionStorage()
  private credentials: Credentials;

  public user$ = this.userSubject.asObservable();

  constructor (private conn: AuthConnectorService<User, Credentials>) {
    if (this.credentials) {
      console.log('with credentials: ', this.credentials);
      this.conn.me(this.credentials)
      .subscribe((response: any) => {
        console.log('on subscription: ', response.data);
        if (response && response.data && response.data.id) {
          this.loginSuccess(this.credentials);
          this.userSubject.next(response.data);
        }
      });
    }
    else {
      console.log('no credentials');
      this.userSubject.next(null);
    }
  }

  register (user: User) {
    let observable = this.conn.register(user);
    
    observable.subscribe((usr: any) => {
      if (usr && usr.id) {
        this.loginSuccess(usr);
      }
    });

    return observable;
  }

  login (user: User) {
    return this.conn.login(user)
    .switchMap((credentials: Credentials) => {
      return this.loginSuccess(credentials);
    });
  }

  logout () {
    let observable = this.conn.logout();

    observable
    .subscribe(() => {
      this.logged = false;
      this.userSubject.next(null);
    });

    return observable;
  }

  isAuth (): Observable<boolean> {
    return this.user$
    .map((usr: User) => usr && !!usr.id);
  }

  getUser (): User {
    return this.user;
  }

  getCredentials (): Credentials {
    return this.credentials;
  }

  private loginSuccess (credentials: Credentials): Observable<User> {
    this.credentials = credentials;
    this.logged = true;

    let observable = this.conn.me(this.credentials);

    observable.subscribe((user: User) => {
      this.userSubject.next(user);
    });

    return observable;
  }

  private logOutSuccess (user: User) {
    this.user = null;
    this.logged = false;
    this.credentials = null;
    this.userSubject.next(null);
  }
}
