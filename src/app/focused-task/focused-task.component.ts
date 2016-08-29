import {Component, OnInit} from '@angular/core';
import {Task} from '../task/task';

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
    this.task = new Task('example todo', false);
  }

  ngOnInit() {
  }

}
