/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DisqusModule} from 'ng2-awesome-disqus';
import {DiscussionComponent} from './discussion.component';

describe('DiscussionComponent', () => {
  let component: DiscussionComponent;
  let fixture: ComponentFixture<DiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussionComponent],
      imports: [DisqusModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
