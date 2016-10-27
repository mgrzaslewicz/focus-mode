import {Injectable} from '@angular/core';
import {Task, Day} from '../task/task';
import {Subject, Subscription, BehaviorSubject} from 'rxjs/Rx';
import {MenuItem} from '../left-menu/left-menu.component';

export class BehaviorSubjectWithSource<T> extends BehaviorSubject<T> {
  public eventName: string;

  constructor(initialValue: T, eventName: string) {
    super(initialValue);
    this.eventName = eventName;
  }

  next(value: T, source?: string): void {
    if (source) {
      console.log(`%cfiring event ${this.eventName} from ${source}`, 'color: lightseagreen');
    } else {
      console.log(`%cfiring event ${this.eventName}`, 'color: lightseagreen');
    }
    console.log(value);
    super.next(value);
  }

  public logOnEvent(destination: string) {
    console.log(`%con event ${this.eventName} at ${destination}`, 'color: lightgreen');
  }

}

@Injectable()
export class EventBusService {
  public userNotLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  public focusedTaskSubject: BehaviorSubjectWithSource<Task> = new BehaviorSubjectWithSource<Task>(null, 'focusedTask');
  public focusedDaySubject: BehaviorSubjectWithSource<Day> = new BehaviorSubjectWithSource<Day>(null, 'focusedDay');
  public menuItemSubject: BehaviorSubjectWithSource<MenuItem> = new BehaviorSubjectWithSource<MenuItem>(null, 'menuItem');
  public hideLeftMenuSubject: BehaviorSubjectWithSource<boolean> = new BehaviorSubjectWithSource<boolean>(false, 'hideLeftMenu');

}
