/* tslint:disable:no-unused-variable */

import {describe, expect, it} from '@angular/core/testing';
import {FocusedTaskComponent} from './focused-task.component';
import {EventBusService} from '../event-bus/event-bus.service';
import {beforeEachProviders} from '@angular/core/testing/testing';
import {inject} from '@angular/core/testing/test_injector';

describe('Component: FocusedTask', () => {
  beforeEachProviders(() => [EventBusService, FocusedTaskComponent]);
  it('should create instance',
    inject([FocusedTaskComponent], (component: FocusedTaskComponent) => {
      expect(component).toBeTruthy();
    }));
});
