import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentInjector } from '../../projects/component-injector/src/lib/component-injector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('injectContainer', {read: ViewContainerRef, static: true}) injectContainer: ViewContainerRef;
  testComponentRef: ComponentRef<any>;

  constructor(protected componentInjector: ComponentInjector) {
  }

  protected injectComponent(componentSelector: string): ComponentRef<any> {
    let result: ComponentRef<any>;
    if (componentSelector) {
      result = this.componentInjector.inject(this.injectContainer, componentSelector);
    }

    return result;
  }

  ngOnInit(): void {
    this.testComponentRef = this.injectComponent('app-test');

    // change the title property of the TestComponent
    setTimeout(() => {
      this.componentInjector.setProperties(this.testComponentRef, {title: 'New Title'})
    }, 2000);

    // remove teh component
    setTimeout(()=>{
      this.componentInjector.remove(this.testComponentRef);
    }, 5000);
  }
}
