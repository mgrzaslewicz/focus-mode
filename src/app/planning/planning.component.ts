import {Component, OnInit, Inject} from '@angular/core';
import {Day, Task} from '../task/task';
import {EventBusService} from '../event-bus';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';
import {TaskService, TaskServiceToken} from '../execute-plan/focused-task/task.service';
import {Router} from '@angular/router';

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

  public goToExecuteDay(day: Day) {
    this.eventBus.focusedDaySubject.next(day, 'PlanningComponent.goToExecuteDay');
    this.taskService.saveDays(this.days, () => {
    });
    this.router.navigateByUrl('/executeplan');
  }

  public addTaskFromDraft(day: Day) {
    day.addTaskFromDraft();
    this.saveDays();
  }

 public saveDays() {
   this.taskService.saveDays(this.days, () => {
   });
 }

  public clearTasks(day: Day) {
    day.clearTasks();
    this.saveDays();
  }

  public removeTask(day: Day, taskIndexZeroBased: number) {
    day.removeTask(taskIndexZeroBased);
    this.saveDays();
  }

  public editTask(day: Day, taskIndexZeroBased: number) {
    day.moveTaskToDraft(taskIndexZeroBased);
    this.saveDays();
  }

  public moveTaskDown(day: Day, taskIndexZeroBased: number) {
    day.moveTaskDown(taskIndexZeroBased);
    this.saveDays();
  }

  public moveTaskUp(day: Day, taskIndexZeroBased: number) {
    day.moveTaskUp(taskIndexZeroBased);
    this.saveDays();
  }

  public copyTaskToNextDay(dayIndex: number, taskIndex: number) {
    if (dayIndex < this.days.length - 1) {
      this.days[dayIndex + 1].createTaskFrom(this.days[dayIndex].getTasks()[taskIndex]);
    }
  }

}
