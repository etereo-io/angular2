# angular2-auth

Angular2 module to manage basic authentication.
Angular2 module to manage basic authentication 
Angular2 module to manage basic authentication 
Angular2 module to manage basic authentication 
Angular2 module to manage basic authentication 
Angular2 module to manage basic authentication 


## How to use it

  To add the module you have to import it in the root module.

  ~~~~~
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { AuthModule } from '@etereo/auth';

  @NgModule({
    declarations: [
    ],

    providers: [],

    // Modules
    imports: [
      BrowserModule,
      AuthModule.forRoot(),
    ]
  })
  export class AppModule {}
  ~~~~~

  ### Directives

  The module exports two structural directives related with authentication that you can use in your templates, **IfAuthDirective** and **IfUnauthDirective**.

  ```
    <div *ifUnauth class="col-sm-4"><a href="login">Login</a></div> <!-- only rendered if the user is not logged in -->

    <div *ifAuth class="col-sm-4"><a href="home">Home</a></div> <!-- only rendered if the user is logged in -->
  ```

  ### Guards

  You can use the following guards in your routes, **AuthGuard** and **UnauthGuard** to check if an user is logged in or not.

  ```
import { UnauthGuard } from '@etereo/auth';
import { AuthGuard } from '@etereo/auth';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: SignInComponent, canActivate: [ UnauthGuard ]}, // only navigate if the user is not logged in (useful to show the login page, for example)
      { path: 'dashboard', component: Dashboard, canActivate: [ AuthGuard ] } // only navigate if the user is authenticated (logged in) 
    ])
  ],
  ```

  ### Services

  **AuthService** is the main service of the module. It provides methods to deal with the backend authentication, to know if an user is already authenticated etc. 

  **API**

  ~~~~
    $user: Observable<User>; // An observable to subscribe to user changes (logout, login)
    register (user: User) : Observable //  Register a new user.
    login (user: User) : Observable // User login attempt
    logout () : Observable // User logout
    isAuth () : boolean // Check if the user is authenticated
    getUser () : User // Get the current user logged in
  ~~~~

  The **AuthService** use an **AuthConnectorService** as it's own implementation of **IAuthConnectorService** to communicate with the server. You can implement your own **AuthConnectorService** and provide it to communicate with your backend.

  It only has to implement three methods:

  ~~~~
    register (user: User) : Observable //  Register a new user.
    login (user: User) : Observable // User login attempt
    logout () : Observable // User logout
  ~~~~

  You can see the ease of the AuthConnectorService implementation:

  ~~~~~
  import { Injectable } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import { BehaviorSubject } from 'rxjs/BehaviorSubject';

  import { IAuthConnectorService } from './auth-connector.interface.service';
  import { HttpService } from '@etereo/http';

  import { AuthEndpoints } from '../models/auth.endpoints';

  @Injectable()
  export class AuthConnectorService<U> implements IAuthConnectorService<U> {
    constructor (private http: HttpService, private endpoints: AuthEndpoints) {}
    
    register(user: U): Observable<U> {
      return this.http
      .post(this.endpoints.REGISTER, user);
    }

    login (user: U): Observable<U> {
      return this.http
      .post(this.endpoints.LOGIN, user);
    }

    logout (): Observable<any> {
      return this.http
      .post('logout', {});
    }
  }
  ~~~~~~

## Module configuration
  
  If you desire add your own implementation of the backend communication service, you have to provide the implementation to the AuthModule in the application's root module.

  ~~~~~
  @NgModule({
    // Modules
    imports: [
      BrowserModule,
      AuthModule.forRoot({ authConnectorProvider: { provide: AuthConnectorService, useClass: YourImplementationOfAuthConnectorService } }),
    ]
  })
  export class AppModule {}
  ~~~~~

  In the other hand, if you don't need a custom implementation of the auth communication service you can provide only your backend endpoints to the module.

  ~~~~~
  @NgModule({
    imports: [
          AuthModule.forRoot({ endpoints: { REGISTER: 'custom/register', LOGIN: 'custom/login, LOGOUT: 'custom/logout' }}),
    ]
  })
  export class AppModule {}
  ~~~~~


## Contrib

  To compile the project you only need to run `npm run build`.

