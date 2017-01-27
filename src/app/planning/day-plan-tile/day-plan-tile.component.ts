import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  EventEmitter,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import {Day} from '../../task/task';
import {EventBusService} from '../../event-bus/event-bus.service';
import {TaskService, TaskServiceToken} from '../../execute-plan/focused-task/task.service';
import {Router} from '@angular/router';
import {TimeProviderToken, TimeProvider} from '../../time-provider/time-provider';
import {TaskInputComponent} from '../task-input/task-input.component';

export interface CopyTaskEvent {
  dayIndex: number;
  taskIndex: number;
}
export interface CopyNotDoneTasksEvent {
  dayIndex: number;
}

@Component({
  selector: 'day-plan-tile',
  templateUrl: './day-plan-tile.component.html',
  styleUrls: ['./day-plan-tile.component.css']
})
export class DayPlanTileComponent implements OnInit {
  @Input() public day: Day;
  @Input() public dayIndex: number;
  @Input() public isShowingFutureDay: boolean;
  @Output() public copyTask: EventEmitter<CopyTaskEvent> = new EventEmitter<CopyTaskEvent>();
  @Output() public copyNotDoneTasks: EventEmitter<CopyNotDoneTasksEvent> = new EventEmitter<CopyNotDoneTasksEvent>();
  @ViewChildren('taskInputComponents') taskInputComponents: QueryList<TaskInputComponent>;

  private eventBus: EventBusService;
  private taskService: TaskService;
  private router: Router;
  private timeProvider: TimeProvider;
  private isShowingQuestion: boolean = false;
  private elementRef: ElementRef;

  constructor(eventBus: EventBusService, @Inject(TaskServiceToken) taskService: TaskService,
              router: Router, @Inject(TimeProviderToken) timeProvider: TimeProvider,
              elementRef: ElementRef) {
    this.eventBus = eventBus;
    this.taskService = taskService;
    this.router = router;
    this.timeProvider = timeProvider;
    this.elementRef = elementRef;
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
    this.hideQuestion();
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
    this.taskInputComponents.toArray()[taskIndexZeroBased].focusInput();
  }

  public moveTaskDown(taskIndexZeroBased: number) {
    this.day.moveTaskDown(taskIndexZeroBased);
    this.saveDay();
  }

  public moveTaskUp(taskIndexZeroBased: number) {
    this.day.moveTaskUp(taskIndexZeroBased);
    this.saveDay();
  }

  public copyTaskToNextDayInTheFuture(taskIndex: number) {
    this.copyTask.emit({dayIndex: this.dayIndex, taskIndex: taskIndex});
  }

  public copyNotDoneTasksToNextDayInTheFuture() {
    this.copyNotDoneTasks.emit({dayIndex: this.dayIndex});
  }

  public isDayVisible(): boolean {
    return this.day && (this.isShowingFutureDay || this.day.isDayCurrentOrPast());
  }

  public showQuestion() {
    this.isShowingQuestion = true;
  }

  public hideQuestion() {
    this.isShowingQuestion = false;
  }

  public scrollInto() {
    console.log(this.elementRef.nativeElement);
    this.elementRef.nativeElement.scrollIntoView();
  }

}
