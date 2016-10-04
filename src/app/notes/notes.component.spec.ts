/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {NotesComponent} from './notes.component';

describe('Component: Notes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotesComponent
      ]
    });
  });

  it('should create an instance', inject([NotesComponent], (notesComponent: NotesComponent) => {
    expect(notesComponent).toBeTruthy();
  }));
});
