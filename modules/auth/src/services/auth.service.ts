import { Subscription } from 'rxjs/Rx'
import { Injectable, Optional, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import * as _ from 'lodash'

import { LocalStorage } from '@etereo/core'

import { AuthConnectorService } from './auth-connector.service'
import { User } from '../models/user.interface'
import { Credentials } from '../models/credentials.interface'

@Injectable()
export class AuthService {
  private logged: boolean

  @LocalStorage() private user: User

  @LocalStorage() private credentials: Credentials

  private userSubject = new BehaviorSubject<User>(this.user)

  public user$ = this.userSubject.asObservable()

  private refreshSubscription: Subscription

  constructor(private conn: AuthConnectorService<User, Credentials>) {
    let self = this

    this.refreshSubscription = conn.refresh$.subscribe(
      (credentials: Credentials) => {
        this.onRefresh(credentials)
      }
    )

    if (this.credentials && this.user) {
      this.conn.me(this.credentials, this.user).subscribe(
        (user: User) => {
          if (user && user.id) {
            this.loginMeSuccess(user)
          }
        }
      )
    }
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe()
  }

  register(user: User) {
    let observable = this.conn.register(user)

    // observable.subscribe((usr: any) => {
    //   if (usr && usr.id) {
    //     this.loginSuccess(usr);
    //   }
    // });

    return observable
  }

  login(user: User) {
    return this.conn.login(user).switchMap((credentials: Credentials) => {
      return this.onLogin(credentials)
    })
  }

  logout() {
    let subscription = this.conn.logout()

    subscription.subscribe(() => {
      this.logOutSuccess()
    })

    return subscription
  }

  isAuth(): Observable<boolean> {
    return this.user$.map((usr: User) => {
      return usr && !!usr.id
    })
  }

  getUser(): User {
    return this.user
  }

  getCredentials(): Credentials {
    return this.credentials
  }

  private onLogin(credentials: Credentials): Observable<User> {
    this.credentials = credentials

    let observable = this.conn.me(this.credentials, this.user)

    observable.subscribe(
      (user: User) => {
        this.loginMeSuccess(user)
      },
      () => {
        this.logOutSuccess()
      }
    )

    return observable
  }

  private loginMeSuccess(user: User) {
    this.logged = true
    this.user = user
    this.userSubject.next(user)
  }

  private logOutSuccess() {
    this.user = null
    this.logged = false
    this.credentials = null
    this.userSubject.next(null)
  }

  private onRefresh(credentials: Credentials) {
    this.credentials = credentials
  }
}
