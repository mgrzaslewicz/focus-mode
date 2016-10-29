/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import { PlanningComponent } from './planning.component';
import {EventBusService} from '../event-bus';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';

describe('Component: Planning', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanningComponent,
        EventBusService,
        DragulaService
      ]
    });
  });

  it('should create an instance', inject([PlanningComponent], (planningComponent: PlanningComponent) => {
    expect(planningComponent).toBeTruthy();
  }));
});
