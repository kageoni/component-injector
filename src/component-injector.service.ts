import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class ComponentInjector {

  constructor(private resolver: ComponentFactoryResolver) {
  }

  inject(container: ViewContainerRef, componentSelector: string): ComponentRef<any> {
    let injectedComponent: ComponentRef<any>;
    let componentFactory = this.getComponentFactory(componentSelector);
    if (componentFactory) {
      injectedComponent = this.injectComponentFactory(container, componentFactory);
    }
    else {
      console.warn('Component [' + componentSelector + '] cannot be found! ' +
        'Make sure it is included in the `entryComponents` list.');
    }

    return injectedComponent ? injectedComponent : null;
  }

  setProperties(componentRef: ComponentRef<any>, properties: any): void {
    if (componentRef) {
      for (let property in properties) {
        if (properties.hasOwnProperty(property)) {
          componentRef.instance[property] = properties[property];
        }
      }
    }
  }

  remove(componentRef: ComponentRef<any>): void {
    componentRef.destroy();
    componentRef = null;
  }

  protected getComponentFactory(componentSelector: string): ComponentFactory<any> {
    let componentFactory: any;
    let factories = Array.from(this.resolver['_factories']);
    let factory = factories.find((component: any) => {
      return component[1].selector === componentSelector;
    });
    if (factory) {
      let factoryClass = factory[0];
      componentFactory = this.resolver.resolveComponentFactory(factoryClass);
    }

    return componentFactory ? componentFactory : null;
  }

  protected injectComponentFactory(container: ViewContainerRef, componentFactory: ComponentFactory<any>): ComponentRef<any> {
    return container.createComponent(componentFactory);
  }

}
