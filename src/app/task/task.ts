export class Task {
  public name: string;
  private done: boolean = false;

  constructor(name: string, done: boolean) {
    this.name = name;
    this.done = done;
  }

  public switchDone() {
    this.done = !this.done;
  }

  public getName(): string {
    return this.name;
  }

  public isDone(): boolean {
    return this.done;
  }

  public asJson(): TaskJson {
    return {
      name: this.name,
      done: this.done
    }
  }

  public getValue(): number {
    return this.getZeroOrValueFromName();
  }

  private getZeroOrValueFromName(): number {
    let foundValueStringWithDollarPrefix = this.name.match(/\$[0-9]+/);
    let result = foundValueStringWithDollarPrefix === null ? 0 : this.getNumberFromNumberWithDollarPrefix(foundValueStringWithDollarPrefix[0]);
    return result;
  }

  private getNumberFromNumberWithDollarPrefix(numberWithDollarPrefix: string) {
    return parseInt(numberWithDollarPrefix.substring(1));
  }

}

export interface TaskJson {
  name: string;
  done: boolean;
}

export interface DayJson {
  tasks: Array<TaskJson>;
  date: string;
}

export class Day {
  public static DAY_PAST = 'past';
  public static DAY_CURRENT = 'current';
  public static DAY_FUTURE = 'future';

  private tasks: Array<Task>;
  public date: Date;
  private positionInTime: string;
  private draftTaskName: string;
  private focusedTaskIndexZeroBased: number = 0;
  private static dayOfWeekNameSundayFirst: Array<string> = ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb'];

  constructor(tasks: Array<Task>, date: Date) {
    this.tasks = tasks;
    this.date = date;
  }

  public getProgressPercent(): number {
    let result: number = 0;
    let howManyDone = 0;
    if (this.tasks.length > 0) {
      this.tasks.forEach((task: Task) => howManyDone += task.isDone() ? 1 : 0);
      result = Math.floor(howManyDone / this.tasks.length * 100);
    }
    return result;
  }

  public getTasks(): Array<Task> {
    return this.tasks;
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public getFocusedTask(): Task {
    return this.tasks[this.focusedTaskIndexZeroBased];
  }

  public setFocusedTaskIndex(index: number) {
    this.focusedTaskIndexZeroBased = index;
  }

  public getFocusedTaskIndexZeroBased(): number {
    return this.focusedTaskIndexZeroBased;
  }

  public switchFocusedTaskDone() {
    this.getFocusedTask().switchDone();
  }

  public switchFocusToNextTask(): Task {
    return this.tasks[++this.focusedTaskIndexZeroBased];
  }

  public switchFocusToPreviousTask(): Task {
    return this.tasks[--this.focusedTaskIndexZeroBased];
  }

  public canSwitchFocusToNextTask(): boolean {
    return this.focusedTaskIndexZeroBased + 1 < this.tasks.length;
  }

  public canSwitchFocusToPreviousTask(): boolean {
    return this.focusedTaskIndexZeroBased - 1 >= 0;
  }

  public addTaskFromDraft() {
    if (this.draftTaskName) {
      this.addTask(new Task(this.draftTaskName, false));
      this.draftTaskName = '';
    }
  }

  public clearTasks() {
    this.tasks = [];
  }

  public asJson(): DayJson {
    return {
      tasks: this.getTasksAsJson(),
      date: this.date ? this.date.toISOString().slice(0, 10) : null
    }
  }

  public getTasksAsJson(): Array<TaskJson> {
    let result: Array<TaskJson> = [];
    this.tasks.forEach((task: Task) => {
      result.push(task.asJson());
    });
    return result;
  }

  public removeTask(taskIndexZeroBased: number) {
    this.tasks.splice(taskIndexZeroBased, 1);
  }

  public moveTaskToDraft(taskIndexZeroBased: number) {
    let taskName: string = this.tasks[taskIndexZeroBased].getName();
    this.removeTask(taskIndexZeroBased);
    this.draftTaskName = taskName;
  }

  public hasNoTasks(): boolean {
    return this.tasks.length == 0;
  }

  public moveTaskDown(taskIndexZeroBased: number) {
    if (taskIndexZeroBased >= 0 && taskIndexZeroBased < this.tasks.length - 1) {
      let newTaskIndexZeroBased = taskIndexZeroBased + 1;
      let tmp = this.tasks[newTaskIndexZeroBased];
      this.tasks[newTaskIndexZeroBased] = this.tasks[taskIndexZeroBased];
      this.tasks[taskIndexZeroBased] = tmp;
    }
  }

  public moveTaskUp(taskIndexZeroBased: number) {
    if (taskIndexZeroBased > 0 && taskIndexZeroBased < this.tasks.length) {
      let newTaskIndexZeroBased = taskIndexZeroBased - 1;
      let tmp = this.tasks[newTaskIndexZeroBased];
      this.tasks[newTaskIndexZeroBased] = this.tasks[taskIndexZeroBased];
      this.tasks[taskIndexZeroBased] = tmp;
    }
  }

  public createTaskFrom(task: Task) {
    this.addTask(new Task(task.getName(), false));
  }

  public copyNotDoneTasksFrom(other: Day) {
    other.getTasks().forEach((task: Task) => {
      if (!task.isDone()) {
        this.createTaskFrom(task)
      }
    });
  }

  public tasksCount(): number {
    return this.tasks.length;
  }

  public tasksValue(): number {
    let result = 0;
    this.tasks.forEach((task: Task) => result += task.getValue());
    return result;
  }

  public hasZeroTasksValue(): boolean {
    return this.tasksValue() == 0;
  }

  public sortTasksByValue() {
    this.tasks.sort((task1: Task, task2: Task) => task2.getValue() - task1.getValue());
  }

  public setDate(date: Date) {
    this.date = date;
  }

  public getDayOfWeekName(): string {
    return Day.dayOfWeekNameSundayFirst[this.date.getDay()];
  }

  public getDateAsISOString() {
    return this.date.toISOString().slice(0, 10);
  }

  public hasAllTasksDone(): boolean {
    let result = true;
    for (let i = 0; i < this.tasks.length; i++) {
      if (!this.tasks[i].isDone()) {
        result = false;
        break;
      }
    }
    return result;
  }

  public setPositionInTime(positionInTime: string) {
    this.positionInTime = positionInTime;
  }

  public getPositionInTime(): string {
    return this.positionInTime;
  }

  public isDayInThePast(): boolean {
    return this.getPositionInTime() == Day.DAY_PAST;
  }

  public isDayCurrent(): boolean {
    return this.getPositionInTime() == Day.DAY_CURRENT;
  }

  public isDayInTheFuture(): boolean {
    return this.getPositionInTime() == Day.DAY_FUTURE;
  }

  public isDayCurrentOrPast(): boolean {
    return this.getPositionInTime() != Day.DAY_FUTURE;
  }

}

export class DayList {
  private days: Array<Day>;

  constructor(days: Array<Day>) {
    this.days = days;
  }

  public getDays(): Array<Day> {
    return this.days;
  }

  private getNextDayInTheFutureIndex(dayIndex: number) {
    return dayIndex - 1;
  }

  public copyTaskToNextDayInTheFuture(dayIndexToCopyFrom: number, taskIndex: number) {
    this.days[this.getNextDayInTheFutureIndex(dayIndexToCopyFrom)].createTaskFrom(this.days[dayIndexToCopyFrom].getTasks()[taskIndex]);
  }

  public copyNotDoneTasksToNextDayInTheFuture(dayIndexToCopyFrom: number) {
    this.days[this.getNextDayInTheFutureIndex(dayIndexToCopyFrom)].copyNotDoneTasksFrom(this.days[dayIndexToCopyFrom]);
  }

}
