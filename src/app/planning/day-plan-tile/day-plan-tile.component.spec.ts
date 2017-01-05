/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DayPlanTileComponent} from './day-plan-tile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventBusService} from '../../event-bus/event-bus.service';
import {
  localStorageServiceConfig,
  LocalStorageTaskService,
  TaskServiceToken
} from '../../execute-plan/focused-task/task.service';
import {LOCAL_STORAGE_SERVICE_CONFIG} from 'angular-2-local-storage';
import {Router} from '@angular/router';
import createSpy = jasmine.createSpy;
import {QuestionComponent} from '../../question/question.component';
import {RealTimeProvider, TimeProviderToken} from '../../time-provider/time-provider';
import {TaskInputComponent} from '../task-input/task-input.component';

class MockRouter {
  navigate = createSpy('navigate');
}

describe('DayPlanTileComponent', () => {
  let component: DayPlanTileComponent;
  let fixture: ComponentFixture<DayPlanTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DayPlanTileComponent,
        QuestionComponent,
        TaskInputComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        EventBusService,
        {provide: TaskServiceToken, LocalStorageTaskService},
        {provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig},
        {provide: TimeProviderToken, useValue: RealTimeProvider},
        {provide: Router, useClass: MockRouter},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayPlanTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
