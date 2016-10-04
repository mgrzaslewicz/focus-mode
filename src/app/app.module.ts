import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FocusedTaskComponent} from './focused-task/focused-task.component';
import {FocusedTaskControlComponent} from './focused-task-control/focused-task-control.component';
import {CountdownTimersComponent} from './countdown-timers/countdown-timers.component';
import {EventBusService} from './event-bus/event-bus.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExecutePlanComponent } from './execute-plan/execute-plan.component';
import { PlanningComponent } from './planning/planning.component';
import { PresentationComponent } from './presentation/presentation.component';
import { NotesComponent } from './notes/notes.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';

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
    NotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    EventBusService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
