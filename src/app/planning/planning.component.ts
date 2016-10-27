import {Component, OnInit, Inject} from '@angular/core';
import {Day} from '../task/task';
import {TaskService, TaskServiceToken} from '../focused-task';
import {EventBusService} from '../event-bus';

@Component({
  selector: ' planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  private eventBus: EventBusService;
  private days: Array<Day> = [];
  private taskService: TaskService;

  constructor(eventBus: EventBusService, @Inject(TaskServiceToken) taskService: TaskService) {
    this.eventBus = eventBus;
    this.taskService = taskService;
  }

  ngOnInit() {
    this.taskService.getDays((days: Array<Day>) => this.setDays(days));
  }

  private setDays(days: Array<Day>) {
    this.days = days;
  }


}
