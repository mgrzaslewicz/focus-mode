import {Component, OnInit} from '@angular/core';
import {Day, Task} from '../task/task';

@Component({
  moduleId: module.id,
  selector: 'focused-task-control',
  templateUrl: 'focused-task-control.component.html',
  styleUrls: ['focused-task-control.component.css']
})
export class FocusedTaskControlComponent implements OnInit {
  private currentProgressBarClass: string = 'p0';
  private currentProgressPercent: number = 0;
  private focusedTask: Task;
  private day: Day;

  constructor() {
    this.day = new Day();
    this.day.addTask(new Task('test 1', false));
    this.day.addTask(new Task('test 2', true));
  }

  ngOnInit() {
  }

  public getCurrentProgressPercent(): number {
    return this.day.getProgressPercent();
  }

  public canSwitchToNextTodo(): boolean {
    return false;
  }

  public canSwitchToPreviousTodo(): boolean {
    return false;
  }

  public showPreviousTodo() {

  }

  public showNextTodo() {

  }

  public switchFocusedTaskDone() {

  }
}
