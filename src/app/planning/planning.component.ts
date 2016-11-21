import {Component, OnInit, Inject} from '@angular/core';
import {Day} from '../task/task';
import {EventBusService} from '../event-bus';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';
import {TaskService, TaskServiceToken} from '../execute-plan/focused-task/task.service';
import {Router} from '@angular/router';
import {CopyTaskEvent} from './day-plan-tile/day-plan-tile.component';

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
  private router: Router;

  constructor(eventBus: EventBusService, @Inject(TaskServiceToken) taskService: TaskService, dragulaService: DragulaService, router: Router) {
    this.eventBus = eventBus;
    this.taskService = taskService;
    this.dragulaService = dragulaService;
    this.router = router;
  }

  ngOnInit() {
    this.dragulaService.drag.subscribe((value: any) => {
      console.log(`drag: ${value[0]}`);
    });
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
    if (copyTaskEvent.dayIndex < this.days.length - 1) {
      this.days[copyTaskEvent.dayIndex + 1].createTaskFrom(this.days[copyTaskEvent.dayIndex].getTasks()[copyTaskEvent.taskIndex]);
    }
    this.saveDays();
  }

}
