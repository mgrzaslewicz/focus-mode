/* tslint:disable:no-unused-variable */
import {inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {EventBusService} from './event-bus/event-bus.service';

describe('App: TimeHackerClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        EventBusService
      ]
    });
  });
  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));
});
