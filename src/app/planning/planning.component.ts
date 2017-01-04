import {Component, OnInit, Inject} from '@angular/core';
import {Day} from '../task/task';
import {EventBusService} from '../event-bus';
import {TaskService, TaskServiceToken} from '../execute-plan/focused-task/task.service';
import {Router} from '@angular/router';
import {CopyTaskEvent, CopyNotDoneTasksEvent} from './day-plan-tile/day-plan-tile.component';

@Component({
  selector: ' planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  private eventBus: EventBusService;
  private days: Array<Day> = [];
  private isShowingFutureDays: boolean = false;
  private taskService: TaskService;
  private router: Router;

  constructor(eventBus: EventBusService, @Inject(TaskServiceToken) taskService: TaskService, router: Router) {
    this.eventBus = eventBus;
    this.taskService = taskService;
    this.router = router;
  }

  ngOnInit() {
    this.taskService.getDays((days: Array<Day>) => this.setDays(days));
  }

  private setDays(days: Array<Day>) {
    this.days = days;
  }

  public saveDays() {
    this.taskService.saveDays(this.days, () => {
    });
  }

  public copyTaskToNextDay(copyTaskEvent: CopyTaskEvent) {
    if (copyTaskEvent.dayIndex > 0) {
      this.days[copyTaskEvent.dayIndex - 1].createTaskFrom(this.days[copyTaskEvent.dayIndex].getTasks()[copyTaskEvent.taskIndex]);
    }
    this.saveDays();
  }

  public copyNotDoneTasksToNextDay(copyNotDoneTasksEvent: CopyNotDoneTasksEvent) {
    if (copyNotDoneTasksEvent.dayIndex > 0) {
      this.days[copyNotDoneTasksEvent.dayIndex - 1].copyNotDoneTasksFrom(this.days[copyNotDoneTasksEvent.dayIndex]);
    }
    this.saveDays();
  }

  public showFutureDays() {
    this.isShowingFutureDays = true;
  }

}
