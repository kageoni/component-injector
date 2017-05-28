component-injector
=====
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Git repository](#git)
6. [Version](#version)

### <a name="description"></a>1. Description
`component-injector` or `ComponentInjector` is a Component Injector service which injects dynamically components into angular2 projects
  
### <a name="installation"></a>2. Installation
Install the module into your application and save it as a dev 
dependency in your `package.json` file  
```
npm install component-injector --save-dev
```

### <a name="usage"></a>3. Usage
In order to use the `ComponentInjector` service you have to include/import 
it into your application:

```typescript
import {ComponentInjector} from "component-injector";
```

Register it as a service provider in your `@NgModule(...)`:
```typescript
@NgModule({
  //...
  providers: [ComponentInjectorService],
  //...
})
```

Import it in your service or other components:
```typescript
import {ComponentInjector} from "component-injector";
```

add it as a parameter into your constructor, to inject it automatically 
and use it in the class methods:
```typescript
export class TestComponent {
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
  
  
### <a name="git"></a>5. Git repository
[https://github.com/kageoni/component-injector](https://github.com/kageoni/component-injector)

### <a name="version"></a>6. Version
0.0.5