 import { Injectable, Injector } from '@angular/core';

import * as corbel from 'corbel-js';

import { CorbelConfig } from '../models/corbel-config.model';
import { CorbelCollectionService } from './resources/collection.service';
import { CorbelResourceService } from './resources/resource.service';

@Injectable()
export class CorbelService {
  driver: CorbelDriver;
  
  resource: CorbelResourceService;
  collection: CorbelCollectionService;

  constructor (config: CorbelConfig) {
    this.driver = corbel.getDriver(config);
    this.resource = new CorbelResourceService(this.driver);
    this.collection = new CorbelCollectionService(this.driver);
  }
}
