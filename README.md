component-injector
=====
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Git repository](#git)
6. [Version](#version)

### <a name="description"></a>1. Description
`component-injector` or `ComponentInjector` is a Component Injector service which injects dynamically components into angular2+ projects
  
### <a name="installation"></a>2. Installation
Install the module into your application and save it as a dev 
dependency in your `package.json` file  
```
npm install component-injector --save-dev
```

### <a name="usage"></a>3. Usage
In order to use the `ComponentInjector` service you have to include/import 
the service and its module, where the service is defined, into your application:

```typescript
import {ComponentInjector, ComponentInjectorModule} from 'component-injector';
```

Register it in your application's `imports` list of your `@NgModule(...)`:
```typescript
@NgModule({
  //...
  imports: [ComponentInjectorModule],
  //...
})
```

Using the method `setComponentFactories()` provide the `entryComponents` list of the application's `@NgModule(...)`.  
The file .`/src/app/app.module.ts`:
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContainerComponent} from './container/container.component';
import {HeroComponent} from './hero/hero.component';

import {ComponentInjector, ComponentInjectorModule} from 'component-injector';

// the list of components which can be injected dynamically
const entryComponents: any[] = [HeroComponent];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    ComponentInjectorModule
  ],
  providers: [],
  entryComponents: entryComponents, // <-- don't forget to specify the list in here as well !!!
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private componentInjector: ComponentInjector) {
    // provide the entryComponents list - the list of components which can be injected dynamically
    this.componentInjector.setComponentFactories(entryComponents);
  }
  
}
```

Import the service into your service or other components:
```typescript
import {ComponentInjector} from "component-injector";
```

add it as a parameter into your constructor, to inject it automatically 
and use it in the class methods:
```typescript
export class ContainerComponent {
  @ViewChild('injectContainer', {read: ViewContainerRef}) injectContainer: ViewContainerRef;
  
  constructor(protected componentInjector: ComponentInjector) {
  }
  
  protected injectComponent(componentSelector: string): ComponentRef<any> {
    let result: ComponentRef<any>;
    if (componentSelector) {
      result = this.componentInjector.inject(this.injectContainer, componentSelector);
    }

    return result;
  }
}
```
where `injectContainer` is the container element defined in your HTML template 
and where the dynamic components will be injected (HTML template of the `ContainerComponent` component):
```html
<div #injectContainer></div>
```
  
  
### <a name="methods"></a>4. Methods
  
#### inject(container: ViewContainerRef, componentSelector: string): ComponentRef<any>
Inject a component into a ViewContainerRef element  
  
*Parameters:*  
**container** - ViewContainerRef element where to inject the component  
**componentSelector** - Selector of the component which should be injected  
  
*Return:*  
Method returns `ComponentRef` of the injected component.  
  
  
#### setProperties(componentRef: ComponentRef<any>, properties: any): void  
Set public properties of the component specified by the componentRef  
  
*Parameters:*  
**componentRef** - ComponentRef object where should be attached the properties  
**properties** - Object which contains the keys (name of the property) and 
values (value of the property)  
  
*Return:*  
Method returns nothing - `void`.  
  
  
#### remove(componentRef: ComponentRef<any>): void  
Remove a component by its ComponentRef  
  
*Parameters:*  
**componentRef** - ComponentRef which should be removed  
  
*Return:*  
Method returns nothing - `void`.  

#### setComponentFactories(componentsList: Type<Component>[]): void  
Define the factories for the entryComponents list 
  
*Parameters:*  
**componentsList** - the list of `entryComponents` defined in the 
the app's module `@NgModule()`
  
*Return:*  
Method returns nothing - `void`. 
  
  
### <a name="git"></a>5. Git repository
[https://github.com/kageoni/component-injector](https://github.com/kageoni/component-injector)

### <a name="version"></a>6. Version
1.0.1