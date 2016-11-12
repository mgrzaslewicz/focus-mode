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

  public asJson(): TaskJson {
    return {
      name: this.name,
      done: this.done
    }
  }
}

export interface TaskJson {
  name: string;
  done: boolean;
}

export interface DayJson {
  name: string;
  tasks: Array<TaskJson>;
  timeline: string;
  time: number;
}

export class Day {
  public name: string;
  private tasks: Array<Task>;
  private timeline: string;
  public date: Date;
  private draftTaskName: string;
  private focusedTaskIndexZeroBased: number = 0;

  constructor(name: string, tasks: Array<Task>, timeline: string, date: Date) {
    this.name = name;
    this.tasks = tasks;
    this.timeline = timeline;
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
      name: this.name,
      tasks: this.getTasksAsJson(),
      timeline: this.timeline,
      time: this.date ? this.date.getTime() : 0
    }
  }

  public getTasksAsJson(): Array<TaskJson> {
    let result: Array<TaskJson> = [];
    this.tasks.forEach((task: Task) => {
      result.push(task.asJson());
    });
    return result;
  }
}
