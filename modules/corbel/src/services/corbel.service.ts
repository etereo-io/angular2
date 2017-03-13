 import { Injectable, ReflectiveInjector } from '@angular/core';

import * as corbel from 'corbel-js';

import { CorbelConfig } from '../models/corbel-config.model';
import { CorbelCollectionService } from './resources/collection.service';
import { CorbelResourceService } from './resources/resource.service';

@Injectable()
export class CorbelService {
  driver: CorbelDriver;
  
  resource: CorbelResourceService;
  collection: CorbelCollectionService;

  constructor (config: CorbelConfig, private reflect: ReflectiveInjector) {
    this.driver = corbel.getDriver(config);
    
    ReflectiveInjector.resolve([{ provide: 'corbelDriver', useValue: this.driver }]);

    this.resource = reflect.get(CorbelResourceService);
    this.collection = reflect.get(CorbelCollectionService);
  }
}
