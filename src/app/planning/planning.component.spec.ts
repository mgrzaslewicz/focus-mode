/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import { PlanningComponent } from './planning.component';

describe('Component: Planning', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanningComponent
      ]
    });
  });

  it('should create an instance', inject([PlanningComponent], (planningComponent: PlanningComponent) => {
    expect(planningComponent).toBeTruthy();
  }));
});
