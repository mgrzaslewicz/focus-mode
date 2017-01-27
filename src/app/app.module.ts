import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FocusedTaskComponent} from './execute-plan/focused-task/focused-task.component';
import {FocusedTaskControlComponent} from './execute-plan/focused-task-control/focused-task-control.component';
import {CountdownTimersComponent} from './countdown-timers/countdown-timers.component';
import {EventBusService} from './event-bus/event-bus.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExecutePlanComponent} from './execute-plan/execute-plan.component';
import {PlanningComponent} from './planning/planning.component';
import {PresentationComponent} from './presentation/presentation.component';
import {NotesComponent} from './notes/notes.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {TaskServiceToken} from './execute-plan/focused-task';
import {AppRoutingModule} from './app.routing-module';
import {RectangleProgressBarComponent} from './rectangle-progress-bar/rectangle-progress-bar.component';
import {DayTasksProgressComponent} from './day-tasks-progress/day-tasks-progress.component';
import {Safe} from './shared/pipes';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LocalStorageModule} from 'angular-2-local-storage';
import {
  DaysFromJsonMapper,
  localStorageServiceConfig,
  LocalStorageTaskService, DayPositionInTimeCalculator
} from './execute-plan/focused-task/task.service';
import {HashLocationStrategy, LocationStrategy, APP_BASE_HREF} from '@angular/common';
import {RealTimeProvider, TimeProviderToken} from './time-provider/time-provider';
import {DayPlanTileComponent} from './planning/day-plan-tile/day-plan-tile.component';
import {QuestionComponent} from './question/question.component';
import {GoalSystemTileComponent} from './planning/goal-tile/goal-system-tile.component';
import {LocalStorageGoalService, GoalServiceToken, GoalsFromJsonMapper} from './execute-plan/focused-task/goal.service';
import {TaskInputComponent} from './planning/task-input/task-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    FocusedTaskComponent,
    FocusedTaskControlComponent,
    CountdownTimersComponent,
    ExecutePlanComponent,
    PlanningComponent,
    PresentationComponent,
    NotesComponent,
    RectangleProgressBarComponent,
    DayTasksProgressComponent,
    Safe,
    DayPlanTileComponent,
    QuestionComponent,
    GoalSystemTileComponent,
    TaskInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LocalStorageModule.withConfig(localStorageServiceConfig),
    AppRoutingModule
  ],
  providers: [
    EventBusService,
    CookieService,
    DaysFromJsonMapper,
    DayPositionInTimeCalculator,
    {provide: TaskServiceToken, useClass: LocalStorageTaskService},
    {provide: GoalServiceToken, useClass: LocalStorageGoalService},
    {provide: TimeProviderToken, useClass: RealTimeProvider},
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    GoalsFromJsonMapper,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
