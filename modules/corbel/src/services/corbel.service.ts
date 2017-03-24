 import { Injectable, Inject } from '@angular/core';

import * as corbel from 'corbel-js';

import { CorbelConfig } from '../models/corbel-config.model';
import { CorbelCollectionService } from './resources/collection.service';
import { CorbelResourceService } from './resources/resource.service';

@Injectable()
export class CorbelService {
  driver: any;
  
  constructor (@Inject('CorbelDriver') driver: any, private resource: CorbelResourceService, private collection: CorbelCollectionService) {
    this.driver = driver;
    console.log('Hello!! I am corbel service');
  }
}
