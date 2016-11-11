/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {PlanningComponent} from './planning.component';
import {EventBusService} from '../event-bus';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';
import {TaskServiceToken, CookieTaskService} from '../execute-plan/focused-task/task.service';
import {AppRoutingModule} from '../app.routing-module';
import {ExecutePlanComponent} from '../execute-plan/execute-plan.component';
import {PresentationComponent} from '../presentation/presentation.component';
import {NotesComponent} from '../notes/notes.component';
import {FormsModule} from '@angular/forms';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';
import {CountdownTimersComponent} from '../countdown-timers/countdown-timers.component';
import {FocusedTaskControlComponent} from '../execute-plan/focused-task-control/focused-task-control.component';
import {FocusedTaskComponent} from '../execute-plan/focused-task/focused-task.component';
import {DayTasksProgressComponent} from '../day-tasks-progress/day-tasks-progress.component';
import {RectangleProgressBarComponent} from '../rectangle-progress-bar/rectangle-progress-bar.component';
import {Safe} from '../shared/pipes';
import {APP_BASE_HREF} from '@angular/common';

describe('Component: Planning', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExecutePlanComponent,
        PresentationComponent,
        NotesComponent,
        CountdownTimersComponent,
        FocusedTaskControlComponent,
        FocusedTaskComponent,
        DayTasksProgressComponent,
        RectangleProgressBarComponent,
        Safe,
        PlanningComponent,
      ],
      imports: [
        FormsModule,
        DragulaModule,
        AppRoutingModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        EventBusService,
        DragulaService,
        {provide: TaskServiceToken, CookieTaskService},
        PlanningComponent,
      ]
    });
  });

  it('should create an instance', inject([PlanningComponent], (planningComponent: PlanningComponent) => {
    expect(planningComponent).toBeTruthy();
  }));
});
