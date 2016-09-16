/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {FocusedTaskControlComponent} from './focused-task-control.component';
import {EventBusService} from '../event-bus/event-bus.service';

describe('Component: FocusedTaskControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FocusedTaskControlComponent,
        EventBusService
      ]
    });
  });
  it('should create instance',
    inject([FocusedTaskControlComponent], (component: FocusedTaskControlComponent) => {
      expect(component).toBeTruthy();
    }));
});
