 import { Injectable, Inject } from '@angular/core';

import * as corbel from 'corbel-sdk-js';

import { CorbelConfig } from '../models/corbel-config.model';
import { CorbelCollectionService } from './resources/collection.service';
import { CorbelResourceService } from './resources/resource.service';

@Injectable()
export class CorbelService {
  driver: any;
  resource: CorbelResourceService;
  collection: CorbelCollectionService;

  constructor (@Inject('CorbelDriver') driver: any, resource: CorbelResourceService, collection: CorbelCollectionService) {
    this.driver = driver;
    this.resource = resource;
    this.collection = collection;
  }
}
