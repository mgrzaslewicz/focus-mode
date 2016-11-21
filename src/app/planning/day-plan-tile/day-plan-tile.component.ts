import {Component, OnInit, Input, Inject, Output, EventEmitter} from '@angular/core';
import {Day} from '../../task/task';
import {EventBusService} from '../../event-bus/event-bus.service';
import {TaskService, TaskServiceToken} from '../../execute-plan/focused-task/task.service';
import {Router} from '@angular/router';

export interface CopyTaskEvent {
  dayIndex: number;
  taskIndex: number;
}

@Component({
  selector: 'day-plan-tile',
  templateUrl: 'day-plan-tile.component.html',
  styleUrls: ['day-plan-tile.component.css']
})
export class DayPlanTileComponent implements OnInit {
  @Input() public day: Day;
  @Input() public dayIndex: number;
  @Output() public copyTask: EventEmitter<CopyTaskEvent> = new EventEmitter<CopyTaskEvent>();
  private eventBus: EventBusService;
  private taskService: TaskService;
  private router: Router;

  constructor(eventBus: EventBusService, @Inject(TaskServiceToken) taskService: TaskService, router: Router) {
    this.eventBus = eventBus;
    this.taskService = taskService;
    this.router = router;
  }

  ngOnInit() {
  }

  public goToExecuteDay(day: Day) {
    this.eventBus.focusedDaySubject.next(day, 'DayPlanTileComponent.goToExecuteDay');
    this.taskService.saveDay(this.day, () => {
      this.router.navigateByUrl('/executeplan');
    });
  }

  public addTaskFromDraft(day: Day) {
    day.addTaskFromDraft();
    this.saveDay();
  }

  public saveDay() {
    this.taskService.saveDay(this.day, () => {
    });
  }

  public clearTasks(day: Day) {
    day.clearTasks();
    this.saveDay();
  }

  public sortTasks(day: Day) {
    day.sortTasksByValue();
    this.saveDay();
  }

  public removeTask(taskIndexZeroBased: number) {
    this.day.removeTask(taskIndexZeroBased);
    this.saveDay();
  }

  public editTask(taskIndexZeroBased: number) {
    this.day.moveTaskToDraft(taskIndexZeroBased);
    this.saveDay();
  }

  public moveTaskDown(taskIndexZeroBased: number) {
    this.day.moveTaskDown(taskIndexZeroBased);
    this.saveDay();
  }

  public moveTaskUp(taskIndexZeroBased: number) {
    this.day.moveTaskUp(taskIndexZeroBased);
    this.saveDay();
  }

  public copyTaskToNextDay(taskIndex: number) {
    this.copyTask.emit({dayIndex: this.dayIndex, taskIndex: taskIndex});
  }

}
