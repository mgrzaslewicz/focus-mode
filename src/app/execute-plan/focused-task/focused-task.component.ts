import {Component, OnInit} from '@angular/core';
import {Task} from '../../task/task';
import {EventBusService} from '../../event-bus/event-bus.service';

@Component({
  selector: 'focused-task',
  templateUrl: 'focused-task.component.html',
  styleUrls: ['focused-task.component.css']
})
export class FocusedTaskComponent implements OnInit {
  private task: Task;
  private eventBus: EventBusService;

  constructor(eventBus: EventBusService) {
    this.eventBus = eventBus;
  }

  ngOnInit() {
    this.eventBus.focusedTaskSubject.asObservable()
      .subscribe((task: Task) => this.setTask(task));
  }

  private setTask(task: Task) {
    this.task = task;
  }

  public hasTask(): boolean {
    return this.task != null;
  }

  public switchTaskDone() {
    this.task.switchDone();
    this.eventBus.taskChangedSubject.next(this.task, 'FocusedTaskComponent.switchTaskDone');
  }

}
