import {Injectable, OpaqueToken} from '@angular/core';
import {SuccessCallback, ErrorCallback} from '../shared/callback';
import {Day, Task} from '../task/task';

export interface DayJson {

}


export interface TaskService {
  getDays(successCallback: SuccessCallback<Array<Day>>, errorCallback?: ErrorCallback): void;
}

export const TaskServiceToken = new OpaqueToken('taskService');

@Injectable()
export class CookieTaskService implements TaskService {
  getDays(successCallback: SuccessCallback<Array<Day>>, errorCallback?: ErrorCallback) {
    let result: Array<Day> = [];
    result.push(new Day('Pn', [new Task('test1', false)], 'current', null));
    result.push(new Day('Wt', [new Task('test2', false)], 'current', null));
    result.push(new Day('Sr', [new Task('test3', false)], 'current', null));
    result.push(new Day('Czw', [new Task('test4', false)], 'current', null));
    result.push(new Day('Pt', [new Task('test5', false)], 'current', null));
    result.push(new Day('Sb', [new Task('test6', false)], 'current', null));
    result.push(new Day('Nd', [new Task('test7', false)], 'current', null));
    successCallback(result);
  }
}
