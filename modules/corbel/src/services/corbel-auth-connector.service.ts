import { Subject, Observable, Observer, Subscription } from 'rxjs/Rx';
import { errorObject } from 'rxjs/util/errorObject';
import { Injectable } from '@angular/core';

import { IAuthConnectorService } from '@etereo/auth';
import { User } from '@etereo/auth';

import { Credentials } from '../models/credentials.model';
import { CorbelService } from './corbel.service';

import 'rxjs/add/operator/map';

@Injectable()
export class CorbelAuthConnectorService implements IAuthConnectorService<User, Credentials>{

  private refreshSubject: Subject<Credentials> = new Subject(); 

  public refresh$: Observable<Credentials> = this.refreshSubject.asObservable();

  constructor(private corbel: CorbelService) { 
    this.corbel.driver.on('token:refresh', (event: Credentials) => {
      this.refreshSubject.next(event);
    });
  }

  register(user: User) {
    return Observable.create((observer: Observer<any>) => {
      this.corbel.driver.iam.users().create(user)
        .then((user: User) => {
          observer.next(user);
          observer.complete();
        });
    });
  }

  login(user: User): Observable<Credentials> {
    return Observable.create((observer: Observer<any>) => {
      this.corbel.driver.iam.token().create({
        claims: {
          'basic_auth.username': user.userName,
          'basic_auth.password': user.password
        }
      })
        .then((payload: any) => {
          observer.next(payload.data);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  logout() {
    return Observable.create((observer: Observer<any>) => {
    });
  }

  me(credentials?: Credentials): Observable<User> {
    if (credentials) {
      this.corbel.driver.config.set('iamToken', credentials);
    }

    return Observable.create((observer: Observer<any>) => {
      this.corbel.driver.iam.user('me')
        .get()
        .then((response: any) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });;
    });
  }

}
