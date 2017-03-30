import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IfMediaDirective } from './src/directives/if-media.directive';
import { MediaQueryClassDirective } from './src/directives/media-query-class.directive';
// import { MutationObserverDirective } from './src/directives/mutation-observer.directive';

@NgModule({
  declarations: [
    IfMediaDirective,
    MediaQueryClassDirective
    // MutationObserverDirective
  ],
  imports: [
  ],
  exports: [
    IfMediaDirective,
    MediaQueryClassDirective
    // MutationObserverDirective
  ]
})

export class DomUtilsModule {
  constructor(){}
  
  static forRoot(): ModuleWithProviders {

    return {
      ngModule: DomUtilsModule,
      providers: [
      ]
    };
  }
}

