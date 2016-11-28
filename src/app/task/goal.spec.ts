import {GoalSystem, Goal} from './goal';

describe('Model: Goals', () => {
  function getSampleGoalSystem(): GoalSystem {
    let goals: Array<Goal> = [
      new Goal('test1'),
      new Goal('test2'),
      new Goal('test3')
    ];
    return new GoalSystem(goals);
  };
  it('should move goal down', () => {
    let goalSystem = getSampleGoalSystem();
    goalSystem.moveGoalDown(1);
    expect(goalSystem.getGoals()[2].getName()).toBe('test2');
    expect(goalSystem.getGoals()[1].getName()).toBe('test3');
  });
  it('should move goal up', () => {
    let goals = getSampleGoalSystem();
    goals.moveGoalUp(1);
    expect(goals.getGoals()[0].getName()).toBe('test2');
    expect(goals.getGoals()[1].getName()).toBe('test1');
  });
  it('should not move goal up when first', () => {
    let goals = getSampleGoalSystem();
    goals.moveGoalUp(0);
    expect(goals.getGoals()[0].getName()).toBe('test1');
  });
  it('should not move goal down when last', () => {
    let goals = getSampleGoalSystem();
    goals.moveGoalDown(2);
    expect(goals.getGoals()[2].getName()).toBe('test3');
  });
});
