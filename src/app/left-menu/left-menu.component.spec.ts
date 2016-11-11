/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {LeftMenuComponent} from './left-menu.component';
import {EventBusService} from '../event-bus/event-bus.service';

describe('Component: LeftMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeftMenuComponent,
        EventBusService
      ]
    });
  });

  it('should create an instance', inject([LeftMenuComponent], (leftMenuComponent: LeftMenuComponent) => {
    expect(leftMenuComponent).toBeTruthy();
  }));

});
