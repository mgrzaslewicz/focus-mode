/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {CountdownTimersComponent} from './countdown-timers.component';
import {EventBusService} from '../event-bus/event-bus.service';

describe('Component: FocusTimers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventBusService, CountdownTimersComponent
      ]
    });
  });
  it('should create an instance',
    inject([CountdownTimersComponent], (focusTimers: CountdownTimersComponent) => {
      expect(focusTimers).toBeTruthy();
    }));
});
