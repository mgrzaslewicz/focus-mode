import {Component, OnInit, Input} from '@angular/core';
import {Day} from '../task/task';
import {EventBusService} from '../event-bus/event-bus.service';

@Component({
  selector: 'day-tasks-progress',
  templateUrl: './day-tasks-progress.component.html',
  styleUrls: ['./day-tasks-progress.component.css']
})
export class DayTasksProgressComponent implements OnInit {
  @Input()
  public day: Day;
  private eventBus: EventBusService;

  constructor(eventBus: EventBusService) {
    this.eventBus = eventBus;
  }

  ngOnInit() {
  }

  public getWidthStyle(): string {
    let percentWidth = 100 / this.day.tasksCount();
    return `width: ${percentWidth}%;`;
  }

  public setFocusedTaskIndex(index: number) {
    if (this.day.getFocusedTaskIndexZeroBased() == index) {
      this.switchFocusedTaskDone();
    } else {
      this.setFocusAtTask(index);
    }
  }

  private switchFocusedTaskDone() {
    this.day.switchFocusedTaskDone();
    this.eventBus.taskChangedSubject.next(this.day.getFocusedTask(), 'FocusedTaskComponent.switchFocusedTaskDone');
  }

  private setFocusAtTask(index: number) {
    this.day.setFocusedTaskIndex(index);
    this.eventBus.focusedTaskSubject.next(this.day.getFocusedTask(), 'DayTasksProgressComponent.setFocusAtTask');
  }

}
