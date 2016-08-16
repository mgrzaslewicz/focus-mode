import {Component, OnInit} from '@angular/core';

class Task {
  private name: string;
  private done: boolean = false;

  constructor(name: string) {
    this.name = name;
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

@Component({
  moduleId: module.id,
  selector: 'focused-task',
  templateUrl: 'focused-task.component.html',
  styleUrls: ['focused-task.component.css']
})
export class FocusedTaskComponent implements OnInit {
  private task: Task;
  private isCurrentTodoSlidingToRight: boolean = false;
  private isCurrentTodoSlidingToLeft: boolean = false;

  constructor() {
    this.task = new Task('example todo');
  }

  ngOnInit() {
  }

}
