import { Injectable, Optional, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { AuthConnectorService } from './auth-connector.service';
import { User } from '../models/user.interface';

@Injectable()
export class AuthService {
  private logged: boolean;
  private userSubject = new BehaviorSubject<User>(null);
  private user: User;

  public user$ = this.userSubject.asObservable();

  constructor (private conn: AuthConnectorService<User>) {}

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
    let observable = this.conn.login(user);

    observable
    .subscribe((usr: User) => {
      this.loginSuccess(usr);
    });

    return observable;
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
