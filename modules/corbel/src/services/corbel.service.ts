 import { Injectable, ReflectiveInjector, Injector } from '@angular/core';

import * as corbel from 'corbel-js';

import { CorbelConfig } from '../models/corbel-config.model';
import { CorbelCollectionService } from './resources/collection.service';
import { CorbelResourceService } from './resources/resource.service';

@Injectable()
export class CorbelService {
  driver: CorbelDriver;
  
  resource: CorbelResourceService;
  collection: CorbelCollectionService;

  constructor (config: CorbelConfig, private injector: Injector) {
    this.driver = corbel.getDriver(config);
    
    ReflectiveInjector.resolve([{ provide: 'CorbelDriver', useValue: this.driver }]);

    let reflector: ReflectiveInjector = <ReflectiveInjector>injector;

    this.resource = reflector.get(CorbelResourceService);
    this.collection = reflector.get(CorbelCollectionService);
  }
}
