/* tslint:disable:no-unused-variable */

import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {EventBusService} from './event-bus.service';

describe('EventBusService Service', () => {
  beforeEachProviders(() => [EventBusService]);

  it('should create instance',
    inject([EventBusService], (service: EventBusService) => {
      expect(service)
        .toBeTruthy();
    }));
});
