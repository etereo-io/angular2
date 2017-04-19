import { Observable } from 'rxjs/Rx';

import { Credentials } from '../models/credentials.interface';

export interface IAuthConnectorService<U, C> {
  register(user: U): Observable<U>;
  login (user: U): Observable<C>;
  logout (): Observable<any>; 
  me (credentials?: C): Observable<U>;
  refresh$: Observable<Credentials>;
}