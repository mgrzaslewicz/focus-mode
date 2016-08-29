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

  public getProgressPercent(): number {
    return 0;
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }
}

export class DayList {

}
