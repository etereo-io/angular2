import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorbelConfig } from './src/models/corbel-config.model';
import { CorbelService } from './src/services/corbel.service';
import { AuthModule } from '@etereo/auth';

@NgModule({
  declarations: [
  ],
  imports: [
    AuthModule
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
        corbelConfig ? { provide: CorbelConfig, useValue: corbelConfig } : CorbelConfig
      ]
    };
  }
}

