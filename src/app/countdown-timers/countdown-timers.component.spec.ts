/* tslint:disable:no-unused-variable */

import {describe, expect, it, inject} from '@angular/core/testing';
import {CountdownTimersComponent} from './countdown-timers.component';
import {EventBusService} from '../event-bus/event-bus.service';
import {beforeEachProviders} from '@angular/core/testing/testing';

describe('Component: FocusTimers', () => {
  beforeEachProviders(() => [EventBusService, CountdownTimersComponent]);
  it('should create an instance',
    inject([CountdownTimersComponent], (focusTimers: CountdownTimersComponent) => {
      expect(focusTimers).toBeTruthy();
    }));
});
