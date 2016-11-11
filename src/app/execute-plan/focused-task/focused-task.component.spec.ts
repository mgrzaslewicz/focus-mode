/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {FocusedTaskComponent} from './focused-task.component';
import {EventBusService} from '../../event-bus/event-bus.service';

describe('Component: FocusedTask', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FocusedTaskComponent,
        EventBusService
      ]
    });
  });
  it('should create instance',
    inject([FocusedTaskComponent], (component: FocusedTaskComponent) => {
      expect(component).toBeTruthy();
    }));
});
