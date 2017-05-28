// Type definitions for ComponentInjector
// Project: ComponentInjector
// Definitions by: tomsa.md

/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

import {ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewContainerRef} from '@angular/core';

// export as namespace ComponentInjector;

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */

declare class ComponentInjector {
  constructor(resolver: ComponentFactoryResolver);

  public inject(container: ViewContainerRef, componentSelector: string): ComponentRef<any>;

  public setProperties(componentRef: ComponentRef<any>, properties: any): void;

  public remove(componentRef: ComponentRef<any>): void;

  protected getComponentFactory(componentSelector: string): ComponentFactory<any>;

  protected injectComponentFactory(container: ViewContainerRef, componentFactory: ComponentFactory<any>): ComponentRef<any>;
}

export {ComponentInjector};
