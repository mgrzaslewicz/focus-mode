import {Injectable} from '@angular/core';
import {Task} from '../task/task';
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
      console.log(`firing event ${this.eventName} from ${source}`);
    } else {
      console.log(`firing event ${this.eventName}`);
    }
    console.log(value);
    super.next(value);
  }

}

@Injectable()
export class EventBusService {
  public userNotLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  public focusedTaskSubject: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  public menuItemSubject: BehaviorSubjectWithSource<MenuItem> = new BehaviorSubjectWithSource<MenuItem>(null, 'menuItem');

}
