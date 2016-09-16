import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FocusedTaskComponent} from './focused-task/focused-task.component';
import {FocusedTaskControlComponent} from './focused-task-control/focused-task-control.component';
import {CountdownTimersComponent} from './countdown-timers/countdown-timers.component';
import {EventBusService} from './event-bus/event-bus.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FocusedTaskComponent,
    FocusedTaskControlComponent,
    CountdownTimersComponent
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
