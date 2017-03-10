import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorbelConfig } from './src/models/corbel-config.model';
import { CorbelService } from './src/services/corbel.service';
import { CorbelAuthConnectorService } from './src/services/corbel-auth-connector.service';

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
  
  static forRoot(corbelConfig?: CorbelConfig): ModuleWithProviders {

    return {
      ngModule: CorbelModule,
      providers: [
        CorbelService,
        CorbelAuthConnectorService,
        corbelConfig ? { provide: CorbelConfig, useValue: corbelConfig } : CorbelConfig
      ]
    };
  }
}

export * from './src/models/corbel-config.model';
export * from './src/services/corbel.service';
export * from './src/services/corbel-auth-connector.service';