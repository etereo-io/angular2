import { Injectable } from '@angular/core';

@Injectable()
export class AuthEndpoints {
  REGISTER = 'signup';
  LOGIN = 'login';
  LOGOUT = 'logout';
}