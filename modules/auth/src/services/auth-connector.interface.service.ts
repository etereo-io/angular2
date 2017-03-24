import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IAuthConnectorService<U, C> {
  register(user: U): Observable<U>;
  login (user: U): Observable<C>;
  logout (): Observable<any>; 
  me (): Observable<U>;
}