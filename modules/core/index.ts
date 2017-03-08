import {NgModule, ModuleWithProviders} from '@angular/core';

export * from './src/guards/module-import.guard';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}
