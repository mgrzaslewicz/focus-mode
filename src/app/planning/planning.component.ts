import {Component, OnInit, Inject} from '@angular/core';
import {Day} from '../task/task';
import {TaskService, TaskServiceToken} from '../focused-task';
import {EventBusService} from '../event-bus';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';

@Component({
  selector: ' planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  private eventBus: EventBusService;
  private days: Array<Day> = [];
  private taskService: TaskService;
  private dragulaService: DragulaService;

  constructor(eventBus: EventBusService, @Inject(TaskServiceToken) taskService: TaskService, dragulaService: DragulaService) {
    this.eventBus = eventBus;
    this.taskService = taskService;
    this.dragulaService = dragulaService;
  }

  ngOnInit() {
    this.taskService.getDays((days: Array<Day>) => this.setDays(days));
  }

  private setDays(days: Array<Day>) {
    this.days = days;
  }


}
