/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DayTasksProgressComponent} from './day-tasks-progress.component';
import {Safe} from '../shared/pipes';
import {EventBusService} from '../event-bus/event-bus.service';

describe('DayTasksProgressComponent', () => {
  let component: DayTasksProgressComponent;
  let fixture: ComponentFixture<DayTasksProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Safe,
        DayTasksProgressComponent
      ],
      providers: [
        EventBusService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTasksProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
