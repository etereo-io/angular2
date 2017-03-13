import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

export const CACHE_TIME: string = 'CACHE_TIME_TOKEN';

@Injectable()
export class CacheDataService {
  private queries: Object = {};

  constructor (@Inject(CACHE_TIME) private cacheTime: number) {}

  checkCache(id: string): boolean {
    if (this.queries[id] && (moment(this.queries[id].timestamp).add(this.cacheTime, 'ms').isSameOrBefore())) {
      return !!this.queries[id].data;
    }
    else {
      return false;
    }
  }

  followRequest(id: string, observable: Observable<any>): Observable<any> {
    let subscription = observable.subscribe((data) => {
      this.addToCache(id, data);
      subscription.unsubscribe();
    });
    
    return observable;
  }

  getFromCache(id: string) {
    return this.queries[id].data;
  }

  clearCache() {
     this.queries = {};
  }

  addToCache(id: string, data: Object) {
    this.queries[id] = {
      data: data,
      timestamp: moment().unix() * 1000
    };
  }

}