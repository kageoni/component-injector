import { TestBed } from '@angular/core/testing';

import { ComponentInjector } from './component-injector';

describe('ComponentInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentInjector = TestBed.get(ComponentInjector);
    expect(service).toBeTruthy();
  });
});
