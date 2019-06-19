import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentInjector {
  public static entryComponentsFactories: ComponentFactory<any>[] = [];


  constructor(private resolver: ComponentFactoryResolver) {

  }

  public setComponentFactories(componentsList: Type<Component>[]): void {
    if (componentsList) {
      componentsList.forEach((component: Type<Component>) => {
        let factory = this.resolver.resolveComponentFactory(component);
        if (factory) {
          ComponentInjector.entryComponentsFactories.push(factory);
        }
      });
    }
  }

  inject(container: ViewContainerRef, componentSelector: string): ComponentRef<any> | null {
    let componentFactory: ComponentFactory<any> = this.getComponentFactory(componentSelector);
    if (componentFactory) {
      return this.injectComponentFactory(container, componentFactory);
    }
    else {
      console.warn('Component [' + componentSelector + '] cannot be found! ' +
        'Make sure it is included in the `entryComponents` list.');
    }

    return null;
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

  remove(componentRef: ComponentRef<any> | null): void {
    if (componentRef) {
      componentRef.destroy();
    }
    componentRef = null;
  }

  protected getComponentFactory(componentSelector: string): ComponentFactory<any> {
    let factories = ComponentInjector.entryComponentsFactories;
    let componentFactory: any = factories.find((component: any) => {
      return component.selector === componentSelector;
    });

    return componentFactory ? componentFactory : null;
  }

  protected injectComponentFactory(container: ViewContainerRef, componentFactory: ComponentFactory<any>): ComponentRef<any> {
    return container.createComponent(componentFactory);
  }
}
