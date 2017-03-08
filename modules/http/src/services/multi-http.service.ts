import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class MultiHttpService {

  constructor () {}

  customRequest (url: string, method: string){
    return Observable.create((observer: Observer<any>) => {

      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onprogress = (event) => {

        let lastJSONIndex = xhr.responseText.lastIndexOf('{'),
        response = xhr.responseText.substring(lastJSONIndex, xhr.responseText.length);

        if (response) {
          if (response.indexOf('error') !== -1) {
            observer.error(new Error('timeout'));
          }
          else {
            try {
              observer.next(JSON.parse(response));
            }
            catch (e) {
            }
          }
        }
      };

      xhr.onload = (event) => {
        observer.complete();
      };

      xhr.open(method, url, true);
      xhr.send();
    });
  }

  get (url: string) {
    return this.customRequest(url, 'GET');
  }

}
