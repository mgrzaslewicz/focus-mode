import {Goals, Goal} from './goal';

describe('Model: Goals', () => {
  function getSampleGoals(): Goals {
    let goalList: Array<Goal> = [
      new Goal('test1'),
      new Goal('test2'),
      new Goal('test3')
    ];
    return new Goals(goalList);
  };
  it('should move goal down', () => {
    let goals = getSampleGoals();
    goals.moveGoalDown(1);
    expect(goals.getGoals()[2].getName()).toBe('test2');
    expect(goals.getGoals()[1].getName()).toBe('test3');
  });
  it('should move goal up', () => {
    let goals = getSampleGoals();
    goals.moveGoalUp(1);
    expect(goals.getGoals()[0].getName()).toBe('test2');
    expect(goals.getGoals()[1].getName()).toBe('test1');
  });
  it('should not move goal up when first', () => {
    let goals = getSampleGoals();
    goals.moveGoalUp(0);
    expect(goals.getGoals()[0].getName()).toBe('test1');
  });
  it('should not move goal down when last', () => {
    let goals = getSampleGoals();
    goals.moveGoalDown(2);
    expect(goals.getGoals()[2].getName()).toBe('test3');
  });
});
