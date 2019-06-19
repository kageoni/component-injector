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

  /**
   * Define the factories for the entryComponents list
   * @param {Type<Component>[]} componentsList
   */
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

  /**
   * Inject a component into a ViewContainerRef element
   * @param container ViewContainerRef element where to inject the component
   * @param componentSelector string Selector of the component which should be injected
   * @returns {ComponentRef<any>} Returns ComponentRef of the injected component
   */
  inject(container: ViewContainerRef, componentSelector: string): ComponentRef<any> | null {
    console.log('AAAAA', {...ComponentInjector.entryComponentsFactories});
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

  /**
   * Set public properties of the component specified by the componentRef
   * @param componentRef ComponentRef object where should be attached the properties
   * @param properties Object which contains the keys (name of the property) and values (value of the property).
   */
  setProperties(componentRef: ComponentRef<any>, properties: any): void {
    if (componentRef) {
      for (let property in properties) {
        if (properties.hasOwnProperty(property)) {
          componentRef.instance[property] = properties[property];
        }
      }
    }
  }

  /**
   * Remove a component by its ComponentRef
   * @param componentRef ComponentRef which should be removed
   */
  remove(componentRef: ComponentRef<any> | null): void {
    if (componentRef) {
      componentRef.destroy();
    }
    componentRef = null;
  }

  /**
   * Get the component factory class from the _factories list based on its selector string name
   * The list of the _factories is created based on the list of components listed in the entryComponents: [...]
   * section of the @NgModule(...)
   * @param componentSelector string Selector of the component
   * @returns {ComponentFactory<any>|null} Returns the factory of the component or NULL if there is no such component
   */
  protected getComponentFactory(componentSelector: string): ComponentFactory<any> {
    let factories = ComponentInjector.entryComponentsFactories;
    let componentFactory: any = factories.find((component: any) => {
      return component.selector === componentSelector;
    });

    console.log('WWWWW', componentSelector, componentFactory);

    return componentFactory ? componentFactory : null;
  }

  /**
   * Inject a componentFactory into a container element
   * @param container ViewContainerRef container element where to inject the component
   * @param componentFactory ComponentFactory which should be injected in the  container element
   * @returns {ComponentRef<any>} returns ComponentRef of the injected componentFactory
   */
  protected injectComponentFactory(container: ViewContainerRef, componentFactory: ComponentFactory<any>): ComponentRef<any> {
    return container.createComponent(componentFactory);
  }
}
