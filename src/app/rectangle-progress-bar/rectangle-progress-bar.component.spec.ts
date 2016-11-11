/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RectangleProgressBarComponent} from './rectangle-progress-bar.component';
import {Safe} from '../shared/pipes';

describe('RectangleProgressBarComponent', () => {
  let component: RectangleProgressBarComponent;
  let fixture: ComponentFixture<RectangleProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Safe,
        RectangleProgressBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
