/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('App: TimeHackerClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent
      ]
    });
  });
  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));
});
