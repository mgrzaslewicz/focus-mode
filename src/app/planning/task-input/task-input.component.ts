import {Component, OnInit, Input, EventEmitter, Output, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Task} from '../../task/task';
import {EventBusService} from '../../event-bus/event-bus.service';

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
  private eventBus: EventBusService;

  constructor(elementRef: ElementRef, eventBus: EventBusService) {
    this.elementRef = elementRef;
    this.eventBus = eventBus;
  }

  ngOnInit() {
    this.subscribeToInputChanges();
    this.eventBus.focusTaskInputSubject.asObservable().subscribe((taskIndexZeroBased: number) => {
      if (taskIndexZeroBased == this.taskIndex) {
        this.focus();
      }
    })
  }

  private subscribeToInputChanges() {
    this.taskInputControl.valueChanges
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe(taskName => {
        this.taskChanged.emit()
      });
  }

  private focus() {
    this.getInput().focus();
  }

  private getInput() {
    return this.elementRef.nativeElement.children[0];
  }

}
