import { Injectable, Optional, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

import { AuthConnectorService } from './auth-connector.service';
import { User } from '../models/user.interface';
import { Credentials } from '../models/credentials.interface';


@Injectable()
export class AuthService {
  private logged: boolean;
  private userSubject = new BehaviorSubject<User>(null);
  private user: User;
  private credentials: Credentials;

  public user$ = this.userSubject.asObservable();

  constructor (private conn: AuthConnectorService<User, Credentials>) {}

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

  isAuth (): boolean {
    return this.logged;
  }

  getUser (): User {
    if (this.isAuth) {
      return this.user;
    }
  }

  getCredentials (): Credentials {
    return this.credentials;
  }

  private loginSuccess (credentials: Credentials): Observable<User> {
    this.credentials = credentials;
    this.logged = true;

    let observable = this.conn.me();

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
