/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GoalSystemTileComponent} from './goal-system-tile.component';
import {QuestionComponent} from '../../question/question.component';
import {FormsModule} from '@angular/forms';
import {
  GoalServiceToken,
  LocalStorageGoalService,
  GoalsFromJsonMapper
} from '../../execute-plan/focused-task/goal.service';
import {localStorageServiceConfig} from '../../execute-plan/focused-task/task.service';
import {LocalStorageModule} from 'angular-2-local-storage';

describe('GoalSystemTileComponent', () => {
  let component: GoalSystemTileComponent;
  let fixture: ComponentFixture<GoalSystemTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalSystemTileComponent,
        QuestionComponent
      ],
      imports: [
        FormsModule,
        LocalStorageModule.withConfig(localStorageServiceConfig),
      ],
      providers: [
        {provide: GoalServiceToken, useClass: LocalStorageGoalService},
        GoalsFromJsonMapper,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalSystemTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
