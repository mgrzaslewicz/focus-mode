export class Task {
  private name: string;
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

}

export class Day {
  private tasks: Array<Task> = new Array<Task>();
  private focusedTaskIndexZeroBased: number = 0;

  constructor() {

  }

  public getProgressPercent(): number {
    let howManyDone = 0;
    this.tasks.forEach((task: Task) => howManyDone += task.isDone() ? 1 : 0);
    return Math.floor(howManyDone / this.tasks.length * 100);
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

}

export class DayList {
  private days: Array<Day> = new Array<Day>();
}
