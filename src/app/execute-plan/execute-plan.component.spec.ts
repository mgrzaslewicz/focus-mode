/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {ExecutePlanComponent} from './execute-plan.component';
import {EventBusService} from '../event-bus/event-bus.service';
import {DaysFromJsonMapper, localStorageServiceConfig, TaskServiceToken} from './focused-task/task.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LocalStorageModule, LocalStorageService} from 'angular-2-local-storage';

describe('Component: ExecutePlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalStorageModule.withConfig(localStorageServiceConfig),
      ],
      providers: [
        ExecutePlanComponent,
        EventBusService,
        CookieService,
        DaysFromJsonMapper,
        {provide: TaskServiceToken, useClass: LocalStorageService},
      ]
    });
  });

  it('should create an instance', inject([ExecutePlanComponent], (executePlanComponent: ExecutePlanComponent) => {
    expect(executePlanComponent).toBeTruthy();
  }));
});
