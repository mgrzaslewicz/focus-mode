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
    this.day = new Day();
    this.day.addTask(new Task('test 1', false));
    this.day.addTask(new Task('test 2', true));
  }

  ngOnInit() {
    this.eventBus.focusedTaskSubject.next(this.day.getFocusedTask());
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
    this.eventBus.focusedTaskSubject.next(this.day.switchFocusToPreviousTask());
  }

  public switchToNextTask() {
    this.eventBus.focusedTaskSubject.next(this.day.switchFocusToNextTask());
  }

  public switchFocusedTaskDone() {
    this.day.switchFocusedTaskDone();
  }

}
