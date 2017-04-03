import {NgModule, ModuleWithProviders} from '@angular/core';

export * from './src/guards/module-import.guard';
export * from './src/decorators/session-storage.decorator';
export * from './src/decorators/local-storage.decorator';

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
