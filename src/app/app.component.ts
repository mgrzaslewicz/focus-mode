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

  constructor(eventBus: EventBusService) {
    this.eventBus = eventBus;
  }

  ngOnInit() {
    this.eventBus.menuItemSubject.asObservable()
      .subscribe((selectedMenuItem: MenuItem) => this.setSelectedMenuItem(selectedMenuItem));
    this.eventBus.menuItemSubject.next(MenuItem.PLANNING, 'AppComponent.ngOnInit');
  }

  private setSelectedMenuItem(selectedMenuItem: MenuItem) {
    console.log(`on event ${this.eventBus.menuItemSubject.eventName} at AppComponent.setSelectedMenuItem`);
    if (selectedMenuItem != null) {
      this.selectedMenuItem = selectedMenuItem;
    }
  }

}
