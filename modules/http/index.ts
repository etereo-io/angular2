import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule as AngularHttpModule } from '@angular/http'; 

import { ApiUrl } from './src/models/api-url.model';
import { BaseReqOptions } from './src/models/base-req-options.model';

import { HttpService } from './src/services/http.service';
import { MultiHttpService } from './src/services/multi-http.service';

export * from './src/services/http.service';
export * from './src/services/multi-http.service';
export * from './src/models/api-url.model';
export * from './src/models/base-req-options.model';


@NgModule({
  declarations: [
  ],
  imports: [
    AngularHttpModule
  ],
  exports: [
    AngularHttpModule
  ]
})

export class HttpModule {
  constructor(){}
  
  static forRoot(apiUrl?: ApiUrl, reqOptions?: BaseReqOptions): ModuleWithProviders {

    return {
      ngModule: HttpModule,
      providers: [
        HttpService,
        MultiHttpService,
        apiUrl ? { provide: ApiUrl, useValue: apiUrl } : ApiUrl,
        reqOptions ? { provide: BaseReqOptions, useValue: reqOptions } : BaseReqOptions
      ]
    };
  }
}

