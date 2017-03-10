import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IAuthConnectorService<U> {
  register(user: U): Observable<U>;
  login (user: U): Observable<U>;
  logout (): Observable<any>; 
}