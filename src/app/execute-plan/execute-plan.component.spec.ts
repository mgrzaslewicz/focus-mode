/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {ExecutePlanComponent} from './execute-plan.component';

describe('Component: ExecutePlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExecutePlanComponent
      ]
    });
  });

  it('should create an instance', inject([ExecutePlanComponent], (executePlanComponent: ExecutePlanComponent) => {
    expect(executePlanComponent).toBeTruthy();
  }));
});
