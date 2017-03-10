import { Injectable } from '@angular/core';

@Injectable()
export class CorbelConfig {
  domain: string = '';
  clientId: string = '';
  clientSecret: string= '';
  urlBase: string= '';
  scopes: string= '';
  userScopes: string= '';
  audience: string= '';
  resourcesEndpoint: string= '';
  iamEndpoint: string= '';
}