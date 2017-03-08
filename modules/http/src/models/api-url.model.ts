import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrl {
  baseUrl: String = 'http://localhost:9000';
  constructor(){};
}