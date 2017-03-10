 import { Injectable } from '@angular/core';

import * as corbel from 'corbel-js';

import { CorbelConfig } from '../models/corbel-config.model';

@Injectable()
export class CorbelService {
  driver: CorbelDriver;

  constructor (config: CorbelConfig) {
    this.driver = corbel.getDriver(config);
  }

}
