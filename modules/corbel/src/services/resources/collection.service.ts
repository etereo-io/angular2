import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as corbel from 'corbel-js';

import { CacheDataService } from '../cache-data.service';

@Injectable()
export class CorbelCollectionService {
  constructor (@Inject('CorbelDriver') private driver: any, private cache: CacheDataService) {
    this.driver = driver;
  }

  get(collectionName: string, options?: Object) {
    const resource: Resource = this.driver.resources.collection(collectionName),
          id = resource.buildUri(collectionName);

    if (this.cache.checkCache(id)) {
      return Observable.of(this.cache.getFromCache(id));
    }
    else {
      let observable = Observable.create((observer: Observer<any>) => {
        resource
        .get(options || {})
        .then((data: any) => {
          observer.next(data);
        })
        .catch((error: any) => {
          observer.error(error);
        });
      });

      return this.cache.followRequest(id, observable);
    }

  }

  update(collectionName: string, data: Object, options?: Object) {
    return Observable.create((observer: Observer<any>) => {
      this.driver.resources.collection(collectionName).update(data, options || {})
      .then((data: any) => {
        observer.next(data);
      });
    });
  }
  
  add(collectionName: string, data: Object, options?: Object) {
    return Observable.create((observer: Observer<any>) => {
      this.driver.resources.collection(collectionName).add(data, options || {})
      .then((data: any) => {
        observer.next(data);
      });
    });
  }

  delete(collectionName: string, options?: Object) {
    return Observable.create((observer: Observer<any>) => {
      this.driver.resources.collection(collectionName).delete(options || {})
      .then((data: any) => {
        observer.next(data);
      });
    });
  }

}
