import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class BaseReqOptions {
  withCredentials: boolean = true;
  headers: Headers = new Headers({ 'Content-Type': 'application/json; boundary=NL'});
}