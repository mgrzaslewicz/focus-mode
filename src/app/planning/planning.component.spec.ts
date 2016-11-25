/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {PlanningComponent} from './planning.component';
import {EventBusService} from '../event-bus';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';
import {
  TaskServiceToken,
  LocalStorageTaskService,
  localStorageServiceConfig
} from '../execute-plan/focused-task/task.service';
import {FormsModule} from '@angular/forms';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';
import {APP_BASE_HREF} from '@angular/common';
import {LOCAL_STORAGE_SERVICE_CONFIG} from 'angular-2-local-storage';
import {DayPlanTileComponent} from './day-plan-tile/day-plan-tile.component';
import {Router} from '@angular/router';
import createSpy = jasmine.createSpy;
import {QuestionComponent} from '../question/question.component';

class MockRouter {
  navigate = createSpy('navigate');
}

describe('Component: Planning', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlanningComponent,
        DayPlanTileComponent,
        QuestionComponent
      ],
      imports: [
        FormsModule,
        DragulaModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        EventBusService,
        DragulaService,
        {provide: TaskServiceToken, LocalStorageTaskService},
        {provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig},
        PlanningComponent,
        {provide: Router, useClass: MockRouter},
      ]
    });
  });

  it('should create an instance', inject([PlanningComponent], (planningComponent: PlanningComponent) => {
    expect(planningComponent).toBeTruthy();
  }));
});
