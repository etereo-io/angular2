 import { Injectable } from '@angular/core';

import * as corbel from 'corbel-js';

import { CorbelConfig } from '../models/corbel-config.model';

@Injectable()
export class CorbelService {
  corbel: CorbelDriver;

  constructor (config: CorbelConfig) {
    this.corbel = corbel.getDriver(config);
  }

}
