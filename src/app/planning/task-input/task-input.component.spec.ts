/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskInputComponent} from './task-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Task} from '../../task/task';
import {EventBusService} from '../../event-bus/event-bus.service';

describe('TaskInputComponent', () => {
  let component: TaskInputComponent;
  let fixture: ComponentFixture<TaskInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskInputComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        EventBusService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInputComponent);
    component = fixture.componentInstance;
    component.task = new Task('', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
