import {Component} from '@angular/core';
import {EventBusService} from './event-bus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private eventBus: EventBusService;
  private isLeftMenuHidden: boolean = false;

  constructor(eventBus: EventBusService) {
    this.eventBus = eventBus;
  }

  ngOnInit() {
    this.eventBus.hideLeftMenuSubject.asObservable()
      .subscribe((hidden: boolean) => this.setLeftMenuHidden(hidden));
  }

  private setLeftMenuHidden(hidden: boolean) {
    this.isLeftMenuHidden = hidden;
  }

}
