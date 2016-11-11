/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {ExecutePlanComponent} from './execute-plan.component';
import {EventBusService} from '../event-bus/event-bus.service';
import {CookieTaskService, TaskServiceToken, DaysFromJsonMapper} from './focused-task/task.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';

describe('Component: ExecutePlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExecutePlanComponent,
        EventBusService,
        CookieService,
        DaysFromJsonMapper,
        {provide: TaskServiceToken, useClass: CookieTaskService}
      ]
    });
  });

  it('should create an instance', inject([ExecutePlanComponent], (executePlanComponent: ExecutePlanComponent) => {
    expect(executePlanComponent).toBeTruthy();
  }));
});
