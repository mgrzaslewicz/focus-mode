import { Component } from '@angular/core';
import {FocusedTaskComponent} from './focused-task/focused-task.component';
import {FocusedTaskControlComponent} from './focused-task-control/focused-task-control.component';
import {CountdownTimersComponent} from './countdown-timers/countdown-timers.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [FocusedTaskComponent, FocusedTaskControlComponent, CountdownTimersComponent]
})
export class AppComponent {
}
