import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';

import * as corbel from 'corbel-js';

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

  update () {
  }
  
  add() {
  }

  delete() {
  }

}
