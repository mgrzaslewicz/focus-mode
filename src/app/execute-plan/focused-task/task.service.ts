import {Injectable, OpaqueToken, Inject} from '@angular/core';
import {SuccessCallback, ErrorCallback} from '../../shared/callback';
import {Day, Task, DayJson, TaskJson} from '../../task/task';
import {LocalStorageService} from 'angular-2-local-storage';
import {TimeProviderToken, TimeProvider} from '../../time-provider/time-provider';

export class DaysFromJsonMapper {

  public createDaysFrom(dayMap: any): Array<Day> {
    let result: Array<Day> = [];
    if (dayMap != null) {
      Object.getOwnPropertyNames(dayMap).forEach((key: string) => {
        result.push(this.createDayFrom(dayMap[key]));
      });
    }
    return result;
  }

  private createDayFrom(dayJson: DayJson): Day {
    return new Day(this.createTasksFrom(dayJson.tasks), new Date(dayJson.date));
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
  saveDay(day: Day, successCallback: SuccessCallback<any>): void;
}

export const TaskServiceToken = new OpaqueToken('taskService');

export const localStorageServiceConfig = {
  prefix: 'th',
  storageType: 'localStorage'
};


@Injectable()
export class LocalStorageTaskService implements TaskService {
  private localStorageService: LocalStorageService;
  private dayFromJsonMapper: DaysFromJsonMapper;
  private timeProvider: TimeProvider;

  constructor(localStorageService: LocalStorageService, dayFromJsonMapper: DaysFromJsonMapper, @Inject(TimeProviderToken) timeProvider: TimeProvider) {
    this.localStorageService = localStorageService;
    this.dayFromJsonMapper = dayFromJsonMapper;
    this.timeProvider = timeProvider;

  }

  public getDays(successCallback: SuccessCallback<Array<Day>>, errorCallback?: ErrorCallback) {
    let dayMap: any = this.getDayMap();
    let result: Array<Day> = this.dayFromJsonMapper.createDaysFrom(dayMap);
    if (result.length == 0) {
      result = this.createEmptyWeek();
    }
    successCallback(result);
  }

  public saveDays(days: Array<Day>, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback) {
    days.forEach((day: Day) => this.saveDayInLocalStorage(day));
    successCallback(null);
  }

  private createEmptyWeek(): Array<Day> {
    let result: Array<Day> = [];
    for (let howManyDaysAhead = 6; howManyDaysAhead >= 0; howManyDaysAhead--) {
      result.push(new Day([], this.getCurrentDatePlusDays(howManyDaysAhead)));
    }
    return result;
  }

  public saveDay(day: Day, successCallback: SuccessCallback<any>) {
    this.saveDayInLocalStorage(day);
    successCallback(null);
  }

  private getDayMap(): any {
    return this.localStorageService.get('dayMap');
  }

  private getDayMapOrCreateEmpty(): any {
    let result: any = this.getDayMap();
    if (!result) {
      result = {};
    }
    return result;
  }

  private saveDayInLocalStorage(day: Day) {
    let dayMap: any = this.getDayMapOrCreateEmpty();
    dayMap[day.getDateAsISOString()] = day.asJson();
    this.localStorageService.set('dayMap', dayMap);
  }

  private getCurrentDatePlusDays(howManyDaysAhead: number) {
    let result = new Date(this.timeProvider.getTime());
    result.setDate(result.getDate() + howManyDaysAhead);
    return result;
  }

}
