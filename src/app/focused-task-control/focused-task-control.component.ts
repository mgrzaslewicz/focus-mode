import {Component, OnInit} from '@angular/core';
import {Day, Task} from '../task/task';
import {EventBusService} from '../event-bus/event-bus.service';

@Component({
  selector: 'focused-task-control',
  templateUrl: 'focused-task-control.component.html',
  styleUrls: ['focused-task-control.component.css']
})
export class FocusedTaskControlComponent implements OnInit {
  private day: Day;
  private eventBus: EventBusService;

  constructor(eventBus: EventBusService) {
    this.eventBus = eventBus;
  }

  ngOnInit() {
    this.eventBus.focusedTaskSubject.next(this.day.getFocusedTask(), 'FocusedTaskControlComponent.ngOnInit');
  }

  public getCurrentProgressPercent(): number {
    return this.day.getProgressPercent();
  }

  public canSwitchToNextTask(): boolean {
    return this.day.canSwitchFocusToNextTask();
  }

  public canSwitchToPreviousTask(): boolean {
    return this.day.canSwitchFocusToPreviousTask();
  }

  public switchToPreviousTask() {
    this.eventBus.focusedTaskSubject.next(this.day.switchFocusToPreviousTask(), 'FocusedTaskControlComponent.switchToPreviousTask');
  }

  public switchToNextTask() {
    this.eventBus.focusedTaskSubject.next(this.day.switchFocusToNextTask(), 'FocusedTaskControlComponent.switchToNextTask');
  }

  public switchFocusedTaskDone() {
    this.day.switchFocusedTaskDone();
  }

}
