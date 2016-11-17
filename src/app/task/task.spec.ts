import {Day, Task} from './task';

describe('Model: Task', () => {
  function getSampleDay(): Day {
    let tasks: Array<Task> = [
      new Task('test1 $2000', false),
      new Task('test2', false),
      new Task('test3 $100', false)
    ];
    let day = new Day('day 1', tasks, 'future', new Date(1));
    return day;
  };
  it('should have focus on zero task initially', () => {
    let day = getSampleDay();
    expect(day.getFocusedTask().getName()).toBe('test1 $2000');
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
  it('should move task down', () => {
    let day = getSampleDay();
    day.moveTaskDown(1);
    expect(day.getTasks()[2].getName()).toBe('test2');
    expect(day.getTasks()[1].getName()).toBe('test3 $100');
  });
  it('should move task up', () => {
    let day = getSampleDay();
    day.moveTaskUp(1);
    expect(day.getTasks()[0].getName()).toBe('test2');
    expect(day.getTasks()[1].getName()).toBe('test1 $2000');
  });
  it('should not move task up when first', () => {
    let day = getSampleDay();
    day.moveTaskUp(0);
    expect(day.getTasks()[0].getName()).toBe('test1 $2000');
  });
  it('should not move task down when last', () => {
    let day = getSampleDay();
    day.moveTaskDown(2);
    expect(day.getTasks()[2].getName()).toBe('test3 $100');
  });
  it('should return value 300 when value 300 at the end of the task name', () => {
    let task = new Task('test todo $300', false);
    expect(task.getValue()).toBe(300);
  });
  it('should return 0 value when no value in the task name', () => {
    let task = new Task('test todo $', false);
    expect(task.getValue()).toBe(0);
  });
  it('should return 2000 value when value 2000 after another number in the task name', () => {
    let task = new Task('test todo 5888 $2000 $199', false);
    expect(task.getValue()).toBe(2000);
  });
  it('should day return sum of tasks value', () => {
    let day = getSampleDay();
    expect(day.tasksValue()).toBe(2100);
  });
  it('should day.hasZeroTasksValue return false when tasksValue is bigger than zero', () => {
    let day = getSampleDay();
    expect(day.hasZeroTasksValue()).toBeFalsy();
  });
  it('should day sort tasks by value descending', () => {
    let day = getSampleDay();
    day.sortTasksByValue();
    expect(day.getTasks()[0].getName()).toBe('test1 $2000');
    expect(day.getTasks()[1].getName()).toBe('test3 $100');
    expect(day.getTasks()[2].getName()).toBe('test2');
  });
});
