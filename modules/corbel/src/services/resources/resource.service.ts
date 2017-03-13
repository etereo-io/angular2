import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';

import { CacheDataService } from '../cache-data.service';

import * as corbel from 'corbel-js';

export class CorbelResourceService {
  driver: CorbelDriver;

  constructor (driver: CorbelDriver, @Inject(CacheDataService) private cache: CacheDataService) {
    this.driver = driver;
  }

  get(collectionName: string, resourceId: string, options: Object) {
    const resource: Resource = this.driver.resources.resource(collectionName, resourceId),
          id = resource.buildUri(collectionName, resourceId);

    if (this.cache.checkCache(id)) {
      return Observable.of(this.cache.getFromCache(id));
    }
    else {
      let observable = Observable.create((observer: Observer<any>) => {
        resource
        .get(options)
        .then((data: any) => {
          observer.next(data);
        });
      });

      return this.cache.followRequest(id, observable);
    }

  }

  update(collectionName: string, resourceId: string, data: Object, options: Object) {
    return Observable.create((observer: Observer<any>) => {
      this.driver.resources.resource(collectionName, resourceId).update(data, options)
      .then((data: any) => {
        observer.next(data);
      });
    });
  }
  
  add(collectionName: string, resourceId: string, data: Object, options: Object) {
    return Observable.create((observer: Observer<any>) => {
      this.driver.resources.resource(collectionName, resourceId).add(data, options)
      .then((data: any) => {
        observer.next(data);
      });
    });
  }

  delete(collectionName: string, resourceId: string, options: Object) {
    return Observable.create((observer: Observer<any>) => {
      this.driver.resources.resource(collectionName, resourceId).delete(options)
      .then((data: any) => {
        observer.next(data);
      });
    });
  }

}
