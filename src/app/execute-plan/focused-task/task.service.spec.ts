/* tslint:disable:no-unused-variable */
import {inject, TestBed} from '@angular/core/testing';
import {EventBusService} from '../../event-bus/event-bus.service';
import {CookieTaskService, TaskServiceToken, TaskService} from './';
import {DaysFromJsonMapper, LocalStorageTaskService, localStorageServiceConfig} from './task.service';
import {Day, DayJson} from '../../task/task';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG} from 'angular-2-local-storage';

let testDay1: DayJson = {
  name: 'day 1',
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
  timeline: 'passed',
  time: 1
};

let testDay2: DayJson = {
  name: 'day 2',
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
  timeline: 'future',
  time: 2
};

let testDayMap: any = {
  'day 1': testDay1,
  'day 2': testDay2,
};

describe('CookieTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventBusService,
        CookieService,
        {provide: TaskServiceToken, useClass: CookieTaskService},
        DaysFromJsonMapper
      ]
    });
  });
  it('should create an instance', inject([TaskServiceToken], (taskService: TaskService) => {
    expect(taskService).toBeTruthy();
  }));
  it('should create days from days map', inject([DaysFromJsonMapper], (daysFromJsonMapper: DaysFromJsonMapper) => {
    let days: Array<Day> = daysFromJsonMapper.createDaysFrom(testDayMap);
    expect(days.length).toBe(2);
    expect(days[0].name).toBe('day 1');
    expect(days[0].date.getTime()).toBe(1);
    expect(days[1].name).toBe('day 2');
    expect(days[1].date.getTime()).toBe(2);
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
});

describe('LocalStorageTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventBusService,
        LocalStorageService,
        {provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig},
        {provide: TaskServiceToken, useClass: LocalStorageTaskService},
        DaysFromJsonMapper
      ]
    });
  });
  it('should create an instance', inject([TaskServiceToken], (taskService: TaskService) => {
    expect(taskService).toBeTruthy();
  }));
  it('should create days from days map', inject([DaysFromJsonMapper], (daysFromJsonMapper: DaysFromJsonMapper) => {
    let days: Array<Day> = daysFromJsonMapper.createDaysFrom(testDayMap);
    expect(days.length).toBe(2);
    expect(days[0].name).toBe('day 1');
    expect(days[0].date.getTime()).toBe(1);
    expect(days[1].name).toBe('day 2');
    expect(days[1].date.getTime()).toBe(2);
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
});
