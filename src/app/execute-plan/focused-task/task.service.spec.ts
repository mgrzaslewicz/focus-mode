/* tslint:disable:no-unused-variable */
import {inject, TestBed} from '@angular/core/testing';
import {EventBusService} from '../../event-bus/event-bus.service';
import {TaskServiceToken, TaskService} from './';
import {DaysFromJsonMapper, LocalStorageTaskService, localStorageServiceConfig} from './task.service';
import {Day, DayJson} from '../../task/task';
import {LocalStorageModule} from 'angular-2-local-storage';
import {TimeProviderToken, TimeProvider} from '../../time-provider/time-provider';

let day1Date = '2016-11-20';

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

let fixedTime = new Date('2016-11-20').getTime();
let fixedTime10DaysLater = new Date('2016-11-30').getTime();
let fixedTime4DaysLater = new Date('2016-11-24').getTime();

class FixedTimeProvider implements TimeProvider {
  private time: number = null;

  public getTime(): number {
    return this.time ? this.time : fixedTime;
  }

  public setTimeFromDateString(date: string) {
    this.time = new Date(date).getTime();
  }

  public setTime(time: number) {
    this.time = time;
  }

}

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalStorageModule.withConfig(localStorageServiceConfig),
      ],
      providers: [
        EventBusService,
        {provide: TaskServiceToken, useClass: LocalStorageTaskService},
        DaysFromJsonMapper,
        {provide: TimeProviderToken, useClass: FixedTimeProvider},
      ]
    });
  });
  it('should create an instance', inject([TaskServiceToken], (taskService: TaskService) => {
    expect(taskService).toBeTruthy();
  }));
  it('should create day 1 with proper date', inject([DaysFromJsonMapper], (daysFromJsonMapper: DaysFromJsonMapper) => {
    let day: Day = daysFromJsonMapper.createDayFrom(testDay1);
    expect(day.date).toEqual(new Date(day1Date));
  }));
  it('should create day 1 with proper tasks', inject([DaysFromJsonMapper], (daysFromJsonMapper: DaysFromJsonMapper) => {
    let day: Day = daysFromJsonMapper.createDayFrom(testDay1);
    expect(day.getTasks().length).toBe(2);
    expect(day.getTasks()[0].getName()).toBe('day 1 task 1');
    expect(day.getTasks()[0].isDone()).toBeTruthy();
    expect(day.getTasks()[1].getName()).toBe('day 1 task 2');
    expect(day.getTasks()[1].isDone()).toBeFalsy();
  }));
  it('should get 7 days ahead when no saved days', inject([TaskServiceToken], (taskService: TaskService) => {
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
  it('should get 7 saved days and 7 days ahead (2 exclusive day periods)', inject([TaskServiceToken, TimeProviderToken], (taskService: TaskService, timeProvider: FixedTimeProvider) => {
    let days: Array<Day>;
    taskService.getDays((response: Array<Day>) => days = response);
    taskService.saveDays(days, () => {
    });
    timeProvider.setTime(fixedTime10DaysLater);
    taskService.getDays((response: Array<Day>) => days = response);
    expect(days.length).toBe(14);
    expect(days[0].date).toEqual(new Date('2016-12-06'));
    expect(days[1].date).toEqual(new Date('2016-12-05'));
    expect(days[2].date).toEqual(new Date('2016-12-04'));
    expect(days[3].date).toEqual(new Date('2016-12-03'));
    expect(days[4].date).toEqual(new Date('2016-12-02'));
    expect(days[5].date).toEqual(new Date('2016-12-01'));
    expect(days[6].date).toEqual(new Date('2016-11-30'));

    expect(days[7].date).toEqual(new Date('2016-11-26'));
    expect(days[8].date).toEqual(new Date('2016-11-25'));
    expect(days[9].date).toEqual(new Date('2016-11-24'));
    expect(days[10].date).toEqual(new Date('2016-11-23'));
    expect(days[11].date).toEqual(new Date('2016-11-22'));
    expect(days[12].date).toEqual(new Date('2016-11-21'));
    expect(days[13].date).toEqual(new Date('2016-11-20'));
  }));
  it('should get 7 saved days and 4 days ahead (2 inclusive day periods, 3 common dates)', inject([TaskServiceToken, TimeProviderToken], (taskService: TaskService, timeProvider: FixedTimeProvider) => {
    let days: Array<Day>;
    taskService.getDays((response: Array<Day>) => days = response);
    taskService.saveDays(days, () => {
    });
    timeProvider.setTime(fixedTime4DaysLater);
    taskService.getDays((response: Array<Day>) => days = response);
    expect(days.length).toBe(11);
    expect(days[0].date).toEqual(new Date('2016-11-30'));
    expect(days[1].date).toEqual(new Date('2016-11-29'));
    expect(days[2].date).toEqual(new Date('2016-11-28'));
    expect(days[3].date).toEqual(new Date('2016-11-27'));
    expect(days[4].date).toEqual(new Date('2016-11-26'));
    expect(days[5].date).toEqual(new Date('2016-11-25'));
    expect(days[6].date).toEqual(new Date('2016-11-24'));
    expect(days[7].date).toEqual(new Date('2016-11-23'));
    expect(days[8].date).toEqual(new Date('2016-11-22'));
    expect(days[9].date).toEqual(new Date('2016-11-21'));
    expect(days[10].date).toEqual(new Date('2016-11-20'));
  }));
});
