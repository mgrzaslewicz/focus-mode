/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {ExecutePlanComponent} from './execute-plan.component';
import {EventBusService} from '../event-bus/event-bus.service';
import {TaskServiceToken, DaysFromJsonMapper, localStorageServiceConfig} from './focused-task/task.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG} from 'angular-2-local-storage';

describe('Component: ExecutePlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExecutePlanComponent,
        EventBusService,
        CookieService,
        DaysFromJsonMapper,
        {provide: TaskServiceToken, useClass: LocalStorageService},
        {provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig}
      ]
    });
  });

  it('should create an instance', inject([ExecutePlanComponent], (executePlanComponent: ExecutePlanComponent) => {
    expect(executePlanComponent).toBeTruthy();
  }));
});
