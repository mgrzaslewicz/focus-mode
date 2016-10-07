import {Component, OnInit} from '@angular/core';
import {EventBusService} from '../event-bus';

@Component({
  selector: 'execute-plan',
  templateUrl: './execute-plan.component.html',
  styleUrls: ['./execute-plan.component.css']
})
export class ExecutePlanComponent implements OnInit {
  private isLeftMenuHidden: boolean = true;
  private eventBus: EventBusService;

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

  public switchLeftMenuHidden() {
    this.eventBus.hideLeftMenuSubject.next(!this.isLeftMenuHidden);
  }

}
