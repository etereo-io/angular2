import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';

import * as corbel from 'corbel-js';
import { CorbelCount } from '../models/corbel-count.model';

@Injectable()
export class CorbelIamService {
  
  constructor (@Inject('CorbelDriver') private driver: any) {}

  getUser(userId: string) {
    const userIam = this.driver.iam.user(userId);

    let observable = Observable.create((observer: Observer<any>) => {
      userIam
      .get()
      .then((response: any) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error: any) => {
        observer.error(error);
      });
    });

    return observable;
  }

  getUsers (params: any) {
    const usersIam = this.driver.iam.users();

    let observable = Observable.create((observer: Observer<any>) => {
      usersIam
      .get(params)
      .then((response: any) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error: any) => {
        observer.error(error);
      });
    });

    return observable;
  }

  update (id: string, userData: any, options: any): Observable<any> {
    const iamUser = this.driver.iam.user(id);

    return Observable.create((observer: Observer<any>) => {
      iamUser.update(userData)
      .then((response: any) => {
        observer.next(response);
        observer.complete();
      })
      .catch((error: any) => {
        observer.error(error);
      });
    });
  }
  
  add (userData: any): Observable<string> {
    const usersIam = this.driver.iam.users();

    return Observable.create((observer: Observer<any>) => {
      usersIam.create(userData)
      .then((userId: string) => {
        observer.next(userId);
        observer.complete();
      })
      .catch((error: any) => {
        observer.error(error);
      });
    });
  }

  delete() {
    
  }

  availability (userName: string): Observable<boolean> {
    return Observable.create((observer: Observer<any>) => {
      this.driver.iam.username().availability(userName)
      .then((isAvailable: boolean) => {
        observer.next(isAvailable);
        observer.complete();
      })
      .catch((error: any) => {
        observer.error(error);
      });
    });
  }

  count (params: { [key: string]: any } = {}): Observable<CorbelCount> {
    params['aggregation'] = { $count: '*' };

    const usersIam = this.driver.iam.users();

    let observable = Observable.create((observer: Observer<any>) => {
      usersIam
      .get(params)
      .then((response: any) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error: any) => {
        observer.error(error);
      });
    });

    return observable;
  }

}
