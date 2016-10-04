import {Component, OnInit} from '@angular/core';
import {EventBusService} from '../event-bus/event-bus.service';

export enum MenuItem {
  PLANNING,
  EXECUTE_PLAN,
  NOTES,
  PRESENTATION
}

@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  private eventBus: EventBusService;
  private MenuItem = MenuItem;
  private selectedMenuItem: MenuItem;

  constructor(eventBus: EventBusService) {
    this.eventBus = eventBus;
    this.eventBus.menuItemSubject.asObservable()
      .subscribe((selectedMenuItem: MenuItem) => this.setSelectedMenuItem(selectedMenuItem));
  }

  ngOnInit() {
  }

  public selectMenuItem(menuItem: MenuItem) {
    this.eventBus.menuItemSubject.next(menuItem, 'LeftMenuComponent.selectMenuItem');
  }

  private setSelectedMenuItem(selectedMenuItem: MenuItem) {
    console.log(`on event ${this.eventBus.menuItemSubject.eventName} at LeftMenuComponent.setSelectedMenuItem`);
    this.selectedMenuItem = selectedMenuItem;
  }

}
