import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorbelConfig } from './src/models/corbel-config.model';
import { CorbelService } from './src/services/corbel.service';
import { CorbelAuthConnectorService } from './src/services/corbel-auth-connector.service';
import { CACHE_TIME } from './src/services/cache-data.service';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})

export class CorbelModule {

  constructor(){}
  
  static forRoot(corbelConfig?: CorbelConfig, cacheTime?: number): ModuleWithProviders {
    if (!cacheTime) {
      cacheTime = 5000 * 60;  
    }

    return {
      ngModule: CorbelModule,
      providers: [
        CorbelService,
        CorbelAuthConnectorService,
        corbelConfig ? { provide: CorbelConfig, useValue: corbelConfig } : CorbelConfig,
        { provide: CACHE_TIME, useValue: cacheTime}
      ]
    };
  }
}

export * from './src/services/cache-data.service';
export * from './src/models/corbel-config.model';
export * from './src/services/corbel.service';
export * from './src/services/corbel-auth-connector.service';