import {Injectable, OpaqueToken, Inject} from '@angular/core';
import {SuccessCallback, ErrorCallback} from '../../shared/callback';
import {Day, Task, DayJson, TaskJson, DayList} from '../../task/task';
import {LocalStorageService, ILocalStorageServiceConfig} from 'angular-2-local-storage';
import {TimeProviderToken, TimeProvider} from '../../time-provider/time-provider';

export class DaysFromJsonMapper {
  public createDayFrom(dayJson: DayJson): Day {

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
  getDayList(successCallback: SuccessCallback<DayList>, errorCallback?: ErrorCallback): void;
  saveDays(days: Array<Day>, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback): void;
  saveDay(day: Day, successCallback: SuccessCallback<any>): void;
}

export const TaskServiceToken = new OpaqueToken('taskService');

export const localStorageServiceConfig: ILocalStorageServiceConfig = {
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

  public getDayList(successCallback: SuccessCallback<DayList>, errorCallback?: ErrorCallback) {
    let dayDateIndex: Array<string> = this.getDayDateIndexOrCreateEmpty();
    this.add7NextDaysIfNotExistTo(dayDateIndex);
    this.sortDayDateIndexDescending(dayDateIndex);
    let result: DayList = this.createDayListFrom(dayDateIndex);
    successCallback(result);
  }

  private createDayListFrom(dayDateIndex: Array<string>): DayList {
    let result: Array<Day> = [];
    dayDateIndex.forEach((dayDate: string) => {
      let dayJson: DayJson = <DayJson> this.localStorageService.get(`day.${dayDate}`);
      let day: Day = dayJson ? this.dayFromJsonMapper.createDayFrom(dayJson) : this.createEmptyDay(dayDate);
      result.push(day);
    });
    return new DayList(result);
  }

  public saveDays(days: Array<Day>, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback) {
    days.forEach((day: Day) => this.saveDayInLocalStorage(day));
    successCallback(null);
  }

  private get7NextDayDates(): Array<string> {
    let result: Array<string> = [];
    for (let howManyDaysAhead = 0; howManyDaysAhead < 7; howManyDaysAhead++) {
      result.push(this.getDateAsISOString(this.getCurrentDatePlusDays(howManyDaysAhead)));
    }
    return result;
  }

  private createEmptyDay(dayDate: string): Day {
    return new Day([], new Date(dayDate));
  }

  public saveDay(day: Day, successCallback: SuccessCallback<any>) {
    this.saveDayInLocalStorage(day);
    successCallback(null);
  }

  private getDayDateIndexFromLocalStorage(): Array<string> {
    return <Array<string>>this.localStorageService.get('dayDateIndex');
  }

  private getDayDateIndexOrCreateEmpty(): Array<string> {
    let result: Array<string> = this.getDayDateIndexFromLocalStorage();
    if (!result) {
      result = [];
    }
    return result;
  }

  private saveDayInLocalStorage(day: Day) {
    this.addDayToIndex(day);
    this.localStorageService.set(`day.${day.getDateAsISOString()}`, day.asJson());
  }

  private getDateAsISOString(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  private getCurrentDatePlusDays(howManyDaysAhead: number) {
    let result = new Date(this.timeProvider.getTime());
    result.setDate(result.getDate() + howManyDaysAhead);
    return result;
  }

  private addDayToIndex(day: Day) {
    let dayDateIndex: any = this.getDayDateIndexOrCreateEmpty();
    if (dayDateIndex.indexOf(day.getDateAsISOString()) == -1) {
      dayDateIndex.push(day.getDateAsISOString());
    }
    this.localStorageService.set('dayDateIndex', dayDateIndex);
  }

  private dayDateIndexContains(dayDateIndex: Array<string>, dayDate: string) {
    return dayDateIndex.indexOf(dayDate) != -1;
  }

  private add7NextDaysIfNotExistTo(dayDateIndex: Array<string>) {
    let sevenNextDays: Array<string> = this.get7NextDayDates();
    sevenNextDays.forEach((dayDate: string) => {
      if (!this.dayDateIndexContains(dayDateIndex, dayDate)) {
        dayDateIndex.push(dayDate);
      }
    });
  }

  private sortDayDateIndexDescending(dayDateIndex: Array<string>) {
    dayDateIndex.sort((dayDate1: string, dayDate2: string) => new Date(dayDate2).getTime() - new Date(dayDate1).getTime());
  }

}
