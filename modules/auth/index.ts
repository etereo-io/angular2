import { NgModule, ModuleWithProviders, Optional, SkipSelf, Provider } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@etereo/http';

import { AuthService } from './src/services/auth.service';
import { AuthEndpoints } from './src/models/auth.endpoints';
import { AuthGuard } from './src/guards/auth.guard';
import { UnauthGuard } from './src/guards/unauth.guard';
import { IfAuthDirective } from './src/directives/if-auth.directive';
import { IfUnauthDirective } from './src/directives/if-unauth.directive';
import { AuthConnectorService } from './src/services/auth-connector.service';
import { User } from './src/models/user.interface';

export * from './src/directives/if-auth.directive';
export * from './src/directives/if-unauth.directive';
export * from './src/guards/auth.guard';
export * from './src/guards/unauth.guard';
export * from './src/models/auth.endpoints';
export * from './src/models/user.interface';
export * from './src/models/credentials.interface';
export * from './src/services/auth-connector.interface.service';
export * from './src/services/auth-connector.service';
export * from './src/services/auth.service';

import { throwIfAlreadyLoaded } from '@etereo/core'; //extract as a 

class AuthProviderObject {
  endpoints?: AuthEndpoints;
  authConnectorProvider?: Provider;
}

@NgModule({
  
  // Components, Pipes, Directive
  declarations: [
    IfAuthDirective,
    IfUnauthDirective
  ],

  providers: [
    AuthService,
    AuthEndpoints,
    AuthGuard,
    UnauthGuard
  ],

  // Modules
  imports: [
    CommonModule,
    HttpModule
  ],

  exports: [
    IfAuthDirective,
    IfUnauthDirective
  ]
})

export class AuthModule {
    constructor( @Optional() @SkipSelf() parentModule: AuthModule) {
      // This prevent the module to be instantiated twice by the user
      throwIfAlreadyLoaded(parentModule, 'AuthModule');
    }
    static forRoot(authProviderObject: AuthProviderObject = {}): ModuleWithProviders {
      return {
        ngModule: AuthModule,
        providers: [
          AuthService,
          authProviderObject.endpoints ? { provide: AuthEndpoints, useValue: authProviderObject.endpoints } : AuthEndpoints,
          authProviderObject.authConnectorProvider ? authProviderObject.authConnectorProvider : AuthConnectorService
        ]
      };
    }
}

