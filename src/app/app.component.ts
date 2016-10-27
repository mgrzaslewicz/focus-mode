import {Component} from '@angular/core';
import {MenuItem} from './left-menu/left-menu.component';
import {EventBusService} from './event-bus';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private eventBus: EventBusService;
  private MenuItem = MenuItem;
  private selectedMenuItem: MenuItem;
  private isLeftMenuHidden: boolean = false;

  constructor(eventBus: EventBusService) {
    this.eventBus = eventBus;
  }

  ngOnInit() {
    this.eventBus.menuItemSubject.asObservable()
      .subscribe((selectedMenuItem: MenuItem) => this.setSelectedMenuItem(selectedMenuItem));
    this.eventBus.hideLeftMenuSubject.asObservable()
      .subscribe((hidden: boolean) => this.setLeftMenuHidden(hidden));
    this.eventBus.menuItemSubject.next(MenuItem.PLANNING, 'AppComponent.ngOnInit');
  }

  private setSelectedMenuItem(selectedMenuItem: MenuItem) {
    this.eventBus.menuItemSubject.logOnEvent('AppComponent.setSelectedMenuItem');
    if (selectedMenuItem != null) {
      this.selectedMenuItem = selectedMenuItem;
      this.handleSelectedMenuItem();
    }
  }

  private handleSelectedMenuItem() {
    switch (this.selectedMenuItem) {
      case MenuItem.EXECUTE_PLAN: {
        this.eventBus.hideLeftMenuSubject.next(true, 'AppComponent.handleSelectedMenuItem');
      }
    }
  }

  private setLeftMenuHidden(hidden: boolean) {
    this.isLeftMenuHidden = hidden;
  }

}
