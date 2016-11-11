/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DayTasksProgressComponent} from './day-tasks-progress.component';
import {Safe} from '../shared/pipes';

describe('DayTasksProgressComponent', () => {
  let component: DayTasksProgressComponent;
  let fixture: ComponentFixture<DayTasksProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Safe,
        DayTasksProgressComponent
      ]
    })
      .compileComponents();
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
