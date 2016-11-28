/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GoalTileComponent} from './goal-tile.component';
import {QuestionComponent} from '../../question/question.component';
import {FormsModule} from '@angular/forms';
import {
  GoalService, GoalServiceToken, LocalStorageGoalService,
  GoalsFromJsonMapper
} from '../../execute-plan/focused-task/goal.service';
import {localStorageServiceConfig} from '../../execute-plan/focused-task/task.service';
import {LOCAL_STORAGE_SERVICE_CONFIG, LocalStorageService} from 'angular-2-local-storage';

describe('GoalTileComponent', () => {
  let component: GoalTileComponent;
  let fixture: ComponentFixture<GoalTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalTileComponent,
        QuestionComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: GoalServiceToken, useClass: LocalStorageGoalService},
        LocalStorageService,
        GoalsFromJsonMapper,
        {provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
