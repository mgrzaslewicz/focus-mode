import {Component, OnInit, Input, EventEmitter, Output, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Task} from '../../task/task';

export interface TaskChangedEvent {
}

@Component({
  selector: 'task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent implements OnInit {
  @Input() public task: Task;
  @Input() public taskIndex: number;
  @Output() public taskChanged: EventEmitter<TaskChangedEvent> = new EventEmitter<TaskChangedEvent>();

  private taskInputControl: FormControl = new FormControl();
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  ngOnInit() {
    this.subscribeToInputChanges();
  }

  private subscribeToInputChanges() {
    this.taskInputControl.valueChanges
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe(taskName => {
        this.taskChanged.emit()
      });
  }

  public focusInput() {
    this.getInput().focus();
  }

  private getInput() {
    return this.elementRef.nativeElement.children[0];
  }

}
