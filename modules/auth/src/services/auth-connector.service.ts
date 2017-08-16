import { Injectable } from '@angular/core'
import { HttpService } from '@etereo/http'
import { Subject, Observable, Subscription } from 'rxjs/Rx'

import { Credentials } from '../models/credentials.interface'
import { IAuthConnectorService } from './auth-connector.interface.service'

import { AuthEndpoints } from '../models/auth.endpoints'

@Injectable()
export class AuthConnectorService<U, C> implements IAuthConnectorService<U, C> {
  private refreshSubject: Subject<Credentials> = new Subject()

  public refresh$: Observable<Credentials> = this.refreshSubject.asObservable()

  constructor(private http: HttpService, private endpoints: AuthEndpoints) {}

  register(user: U): Observable<U> {
    return this.http.post(this.endpoints.REGISTER, user)
  }

  login(user: U): Observable<C> {
    return this.http.post(this.endpoints.LOGIN, user)
  }

  logout(): Observable<any> {
    return this.http.post(this.endpoints.LOGOUT, {})
  }

  me(credentials?: C, user?: U): Observable<any> {
    return this.http.get(this.endpoints.ME)
  }
}
