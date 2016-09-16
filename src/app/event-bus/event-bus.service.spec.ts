/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {EventBusService} from './event-bus.service';

describe('EventBusService Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventBusService
      ]
    });
  });

  it('should create instance',
    inject([EventBusService], (service: EventBusService) => {
      expect(service)
        .toBeTruthy();
    }));
});
