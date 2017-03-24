import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { IAuthConnectorService } from '@etereo/auth';
import { User } from '@etereo/auth';

import { Credentials } from '../models/credentials.model';
import { CorbelService } from './corbel.service';

import 'rxjs/add/operator/map';

@Injectable()
export class CorbelAuthConnectorService implements IAuthConnectorService<User, Credentials>{
  constructor (private corbel: CorbelService) {}

  register (user: User) {
    return Observable.create((observer: Observer<any>) => {
      this.corbel.driver.iam.users().create(user)
      .then((user: User)=>{
        observer.next(user);
        observer.complete();
      });
    });
  }

  login (user: User): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.corbel.driver.iam.token().create({
        claims: {
          'basic_auth.username': user.userName,
          'basic_auth.password': user.password
        }
      })
      .then((payload: any)=>{
        observer.next(payload.data);
        observer.complete();
      });
    });
  }

  logout () {
    return Observable.create((observer: Observer<any>) => {
    });
  }

  me (): Observable<User> {
    return Observable.create((observer: Observer<any>) => {
      this.corbel.driver.iam.user('me')
      .get()
      .then((payload: any)=>{
        observer.next(payload.data);
        observer.complete();
      });
    });
  }
}
