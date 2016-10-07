/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {EventBusService} from '../event-bus/event-bus.service';
import {CookieTaskService, TaskServiceToken, TaskService} from './';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventBusService,
        {provide: TaskServiceToken, useClass: CookieTaskService}
      ]
    });
  });
  it('should create an instance', inject([TaskServiceToken], (taskService: TaskService) => {
    expect(taskService)
      .toBeTruthy();
  }));
});
