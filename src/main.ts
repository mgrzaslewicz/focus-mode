import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppComponent, environment} from './app/';
import {EventBusService} from './app/event-bus/event-bus.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  EventBusService
]);

