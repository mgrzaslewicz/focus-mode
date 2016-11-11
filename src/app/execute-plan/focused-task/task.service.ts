import {Injectable, OpaqueToken} from '@angular/core';
import {SuccessCallback, ErrorCallback} from '../../shared/callback';
import {Day, Task} from '../../task/task';
import {CookieService} from 'angular2-cookie/services/cookies.service';

export interface TaskJson {
  name: string;
  done: boolean;
}

export interface DayJson {
  name: string;
  tasks: Array<TaskJson>;
  timeline: string;
  time: number;
}

export class DaysFromJsonMapper {

  public createDaysFrom(days: Array<DayJson>): Array<Day> {
    let result: Array<Day> = null;
    if (days != null) {
      result = [];
      days.forEach((dayJson: DayJson) => {
        result.push(this.createDayFrom(dayJson));
      });
    }
    return result;
  }

  private createDayFrom(dayJson: DayJson): Day {
    return new Day(dayJson.name, this.createTasksFrom(dayJson.tasks), dayJson.timeline, new Date(dayJson.time));
  }

  private createTasksFrom(tasks: Array<TaskJson>): Array<Task> {
    let result: Array<Task> = [];
    tasks.forEach((taskJson: TaskJson) => {
      result.push(this.createTaskFrom(taskJson));
    });
    return result;
  }

  private createTaskFrom(taskJson: TaskJson): Task {
    return new Task(taskJson.name, taskJson.done);
  }
}

export interface TaskService {
  getDays(successCallback: SuccessCallback<Array<Day>>, errorCallback?: ErrorCallback): void;
  saveDays(days: Array<Day>, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback): void;
}

export const TaskServiceToken = new OpaqueToken('taskService');

@Injectable()
export class CookieTaskService implements TaskService {
  private cookieService: CookieService;
  private dayFromJsonMapper: DaysFromJsonMapper;

  constructor(cookieService: CookieService, dayFromJsonMapper: DaysFromJsonMapper) {
    this.cookieService = cookieService;
    this.dayFromJsonMapper = dayFromJsonMapper;

  }

  public getDays(successCallback: SuccessCallback<Array<Day>>, errorCallback?: ErrorCallback) {
    let week: Array<DayJson> = <Array<DayJson>>this.cookieService.getObject('week');
    let result: Array<Day> = this.dayFromJsonMapper.createDaysFrom(week);
    if (result == null) {
      result = this.createEmptyWeek();
    }

    successCallback(result);
  }

  public saveDays(days: Array<Day>, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback) {
    this.cookieService.putObject('week', days);
  }

  private createEmptyWeek(): Array<Day> {
    let result: Array<Day> = [];
    result.push(new Day('Pn', [], 'current', null));
    result.push(new Day('Wt', [], 'current', null));
    result.push(new Day('Sr', [], 'current', null));
    result.push(new Day('Czw', [], 'current', null));
    result.push(new Day('Pt', [], 'current', null));
    result.push(new Day('Sb', [], 'current', null));
    result.push(new Day('Nd', [], 'current', null));
    return result;
  }
}
