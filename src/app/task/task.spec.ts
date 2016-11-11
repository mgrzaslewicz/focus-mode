import {Day, Task} from './task';

describe('Model: Task', () => {
  function getSampleDay(): Day {
    let tasks: Array<Task> = [
      new Task('test1', false),
      new Task('test2', false),
      new Task('test3', false)
    ];
    let day = new Day('day 1', tasks, 'future', new Date(1));
    return day;
  };
  it('should have focus on zero task initially', () => {
    let day = getSampleDay();
    expect(day.getFocusedTask().getName()).toBe('test1');
  });
  it('should switch focus to next task', () => {
    let day = getSampleDay();
    day.switchFocusToNextTask();
    expect(day.getFocusedTask().getName()).toBe('test2');
  });
  it('should not be able to switch focus to next task', () => {
    let day = getSampleDay();
    day.switchFocusToNextTask();
    day.switchFocusToNextTask();
    expect(day.canSwitchFocusToNextTask()).toBeFalsy();
  });
  it('should not be able to switch focus to zero task', () => {
    let day = getSampleDay();
    day.switchFocusToNextTask();
    expect(day.canSwitchFocusToNextTask()).toBeTruthy();
  });
  it('should not be able to switch focus to previous task', () => {
    let day = getSampleDay();
    expect(day.canSwitchFocusToPreviousTask()).toBeFalsy();
  });
  it('should have progress percent 0 when no tasks done', () => {
    let day = getSampleDay();
    expect(day.getProgressPercent()).toBe(0);
  });
  it('should have progress percent 33 when one task done', () => {
    let day = getSampleDay();
    day.getFocusedTask().switchDone();
    expect(day.getProgressPercent()).toBe(33);
  });
  it('should have progress percent 100 when all tasks done', () => {
    let day = getSampleDay();
    day.getTasks().forEach((task: Task) => task.switchDone());
    expect(day.getProgressPercent()).toBe(100);
  });
});
