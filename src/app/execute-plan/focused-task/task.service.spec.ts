/* tslint:disable:no-unused-variable */
import {inject, TestBed} from '@angular/core/testing';
import {EventBusService} from '../../event-bus/event-bus.service';
import {TaskServiceToken, TaskService} from './';
import {DaysFromJsonMapper, LocalStorageTaskService, localStorageServiceConfig} from './task.service';
import {Day, DayJson} from '../../task/task';
import {LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG} from 'angular-2-local-storage';
import {TimeProviderToken, TimeProvider} from '../../time-provider/time-provider';

let day1Date = '2016-11-20';
let day2Date = '2016-11-21';

let testDay1: DayJson = {
  tasks: [
    {
      name: 'day 1 task 1',
      done: true
    },
    {
      name: 'day 1 task 2',
      done: false
    }
  ],
  date: day1Date
};

let testDay2: DayJson = {
  tasks: [
    {
      name: 'day 2 task 1',
      done: true
    },
    {
      name: 'day 2 task 2',
      done: false
    }
  ],
  date: day2Date
};

let testDayMap: any = {
  'day 1': testDay1,
  'day 2': testDay2,
};

let fixedTime = new Date('2016-11-20').getTime();

class FixedTimeProvider implements TimeProvider {
  private time: number = null;

  public getTime(): number {
    return this.time ? this.time : fixedTime;
  }

  public setTimeFromDateString(date: string) {
    this.time = new Date(date).getTime();
  }

}

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventBusService,
        LocalStorageService,
        {provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig},
        {provide: TaskServiceToken, useClass: LocalStorageTaskService},
        DaysFromJsonMapper,
        {provide: TimeProviderToken, useClass: FixedTimeProvider},
      ]
    });
  });
  it('should create an instance', inject([TaskServiceToken], (taskService: TaskService) => {
    expect(taskService).toBeTruthy();
  }));
  it('should create days from days map', inject([DaysFromJsonMapper], (daysFromJsonMapper: DaysFromJsonMapper) => {
    let days: Array<Day> = daysFromJsonMapper.createDaysFrom(testDayMap);
    expect(days.length).toBe(2);
    expect(days[0].date.getTime()).toBe(new Date(day1Date).getTime());
    expect(days[1].date.getTime()).toBe(new Date(day2Date).getTime());
  }));
  it('should create empty day list from null day map', inject([DaysFromJsonMapper], (daysFromJsonMapper: DaysFromJsonMapper) => {
    let days: Array<Day> = daysFromJsonMapper.createDaysFrom(null);
    expect(days.length).toBe(0);
  }));
  it('should create day 1 from from days map with proper tasks', inject([DaysFromJsonMapper], (daysFromJsonMapper: DaysFromJsonMapper) => {
    let days: Array<Day> = daysFromJsonMapper.createDaysFrom(testDayMap);
    expect(days.length).toBe(2);
    expect(days[0].getTasks().length).toBe(2);
    expect(days[0].getTasks()[0].getName()).toBe('day 1 task 1');
    expect(days[0].getTasks()[0].isDone()).toBeTruthy();
    expect(days[0].getTasks()[1].getName()).toBe('day 1 task 2');
    expect(days[0].getTasks()[1].isDone()).toBeFalsy();
  }));
  it('should get 7 days when no saved days', inject([TaskServiceToken], (taskService: TaskService) => {
    let days: Array<Day>;
    taskService.getDays((response: Array<Day>) => days = response);
    expect(days.length).toBe(7);
    expect(days[0].date).toEqual(new Date('2016-11-26'));
    expect(days[1].date).toEqual(new Date('2016-11-25'));
    expect(days[2].date).toEqual(new Date('2016-11-24'));
    expect(days[3].date).toEqual(new Date('2016-11-23'));
    expect(days[4].date).toEqual(new Date('2016-11-22'));
    expect(days[5].date).toEqual(new Date('2016-11-21'));
    expect(days[6].date).toEqual(new Date('2016-11-20'));
  }));
});
