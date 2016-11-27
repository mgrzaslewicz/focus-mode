/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GoalTileComponent} from './goal-tile.component';
import {QuestionComponent} from '../../question/question.component';
import {FormsModule} from '@angular/forms';

describe('GoalTileComponent', () => {
  let component: GoalTileComponent;
  let fixture: ComponentFixture<GoalTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GoalTileComponent,
        QuestionComponent
      ],
      imports: [
       FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
