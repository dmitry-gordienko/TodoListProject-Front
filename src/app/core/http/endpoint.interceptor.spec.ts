import { TestBed } from '@angular/core/testing';

import { EndpointInterceptor } from './endpoint.interceptor';

describe('EndpointInterceptorService', () => {
  let service: EndpointInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
