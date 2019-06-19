import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComponentInjector } from '../../projects/component-injector/src/lib/component-injector';
import { ComponentInjectorModule } from '../../projects/component-injector/src/lib/component-injector.module';

import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';

const entryComponents: any[] = [
  TestComponent
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ComponentInjectorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: entryComponents
})
export class AppModule {
  constructor(private componentInjector: ComponentInjector) {
    // provide the entryComponents list - the list of components which can be injected dynamically
    this.componentInjector.setComponentFactories(entryComponents);
  }
}
