import {Injectable} from '@angular/core';
import {Task} from '../task/task';
import {Subject, Subscription, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class EventBusService {
  public userNotLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  public focusedTaskSubject: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);

}
