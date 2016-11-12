import {Component, OnInit, Inject} from '@angular/core';
import {EventBusService} from '../event-bus';
import {Day} from '../task/task';
import {TaskService, TaskServiceToken} from './focused-task';

@Component({
  selector: 'execute-plan',
  templateUrl: './execute-plan.component.html',
  styleUrls: ['./execute-plan.component.css']
})
export class ExecutePlanComponent implements OnInit {
  private isLeftMenuHidden: boolean = true;
  private eventBus: EventBusService;
  private focusedDay: Day;
  private taskService: TaskService;

  constructor(eventBus: EventBusService, @Inject(TaskServiceToken) taskService: TaskService) {
    this.eventBus = eventBus;
    this.taskService = taskService;
  }

  ngOnInit() {
    this.eventBus.hideLeftMenuSubject.asObservable()
      .subscribe((hidden: boolean) => this.setLeftMenuHidden(hidden));
    this.eventBus.focusedDaySubject.asObservable().subscribe((day: Day) => this.setFocusedDay(day));
  }

  private setLeftMenuHidden(hidden: boolean) {
    this.eventBus.hideLeftMenuSubject.logOnEvent('ExecutePlanComponent.setLeftMenuHidden');
    this.isLeftMenuHidden = hidden;
  }

  public switchLeftMenuHidden() {
    this.eventBus.hideLeftMenuSubject.next(!this.isLeftMenuHidden, 'ExecutePlanComponent.switchLeftMenuHidden');
  }

  private setFocusedDay(day: Day) {
    this.eventBus.focusedDaySubject.logOnEvent('ExecutePlanComponent.setFocusedDay');
    this.focusedDay = day;
  }

}
