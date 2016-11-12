import {Component, OnInit, Input} from '@angular/core';
import {Task} from '../task/task';

@Component({
  selector: 'day-tasks-progress',
  templateUrl: './day-tasks-progress.component.html',
  styleUrls: ['./day-tasks-progress.component.css']
})
export class DayTasksProgressComponent implements OnInit {
  @Input()
  public focusedTaskIndex: number = 0;
  @Input()
  public tasks: Array<Task>;

  constructor() {
  }

  ngOnInit() {
  }

  public getWidthStyle(): string {
    let percentWidth = 100 / this.tasks.length;
    return `width: ${percentWidth}%;`;
  }

}
