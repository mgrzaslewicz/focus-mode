/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {PresentationComponent} from './presentation.component';

describe('Component: Presentation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PresentationComponent
      ]
    });
  });

  it('should create an instance', inject([PresentationComponent], (presentationComponent: PresentationComponent) => {
    expect(presentationComponent).toBeTruthy();
  }));
});
