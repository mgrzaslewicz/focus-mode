/* tslint:disable:no-unused-variable */

import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {FocusedTaskControlComponent} from './focused-task-control.component';
import {EventBusService} from '../event-bus/event-bus.service';

describe('Component: FocusedTaskControl', () => {
  beforeEachProviders(() => [EventBusService, FocusedTaskControlComponent]);
  it('should create instance',
    inject([FocusedTaskControlComponent], (component: FocusedTaskControlComponent) => {
      expect(component).toBeTruthy();
    }));
});
