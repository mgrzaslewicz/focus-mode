export class Goal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public asJson(): GoalJson {
    return {
      name: this.name
    }
  }

  public getValue(): number {
    return this.getZeroOrValueFromName();
  }

  private getZeroOrValueFromName(): number {
    let foundValueStringWithDollarPrefix = this.name.match(/\$[0-9]+/);
    let result = foundValueStringWithDollarPrefix === null ? 0 : this.getNumberFromNumberWithDollarPrefix(foundValueStringWithDollarPrefix[0]);
    return result;
  }

  private getNumberFromNumberWithDollarPrefix(numberWithDollarPrefix: string) {
    return parseInt(numberWithDollarPrefix.substring(1));
  }

}

export interface GoalJson {
  name: string;
}

export interface GoalsJson {
  goals: Array<GoalJson>;
}

export class Goals {
  private goals: Array<Goal>;
  private draftGoalName: string;

  constructor(goals: Array<Goal>) {
    this.goals = goals;
  }

  public getGoals(): Array<Goal> {
    return this.goals;
  }

  public addGoal(goal: Goal) {
    this.goals.push(goal);
  }

  public addGoalFromDraft() {
    if (this.draftGoalName) {
      this.addGoal(new Goal(this.draftGoalName));
      this.draftGoalName = '';
    }
  }

  public clearTasks() {
    this.goals = [];
  }

  public asJson(): GoalsJson {
    return {
      goals: this.getGoalsAsJson()
    }
  }

  public getGoalsAsJson(): Array<GoalJson> {
    let result: Array<GoalJson> = [];
    this.goals.forEach((goal: Goal) => {
      result.push(goal.asJson());
    });
    return result;
  }

  public removeGoal(goalIndexZeroBased: number) {
    this.goals.splice(goalIndexZeroBased, 1);
  }

  public moveGoalToDraft(goalIndexZeroBased: number) {
    let goalName: string = this.goals[goalIndexZeroBased].getName();
    this.removeGoal(goalIndexZeroBased);
    this.draftGoalName = goalName;
  }

  public hasNoGoals(): boolean {
    return this.goals.length == 0;
  }

  public moveGoalDown(goalIndexZeroBased: number) {
    if (goalIndexZeroBased >= 0 && goalIndexZeroBased < this.goals.length - 1) {
      let newGoalIndexZeroBased = goalIndexZeroBased + 1;
      let tmp = this.goals[newGoalIndexZeroBased];
      this.goals[newGoalIndexZeroBased] = this.goals[goalIndexZeroBased];
      this.goals[goalIndexZeroBased] = tmp;
    }
  }

  public moveGoalUp(goalIndexZeroBased: number) {
    if (goalIndexZeroBased > 0 && goalIndexZeroBased < this.goals.length) {
      let newTaskIndexZeroBased = goalIndexZeroBased - 1;
      let tmp = this.goals[newTaskIndexZeroBased];
      this.goals[newTaskIndexZeroBased] = this.goals[goalIndexZeroBased];
      this.goals[goalIndexZeroBased] = tmp;
    }
  }

  public createGoalFrom(goal: Goal) {
    this.addGoal(new Goal(goal.getName()));
  }

  public goalsCount(): number {
    return this.goals.length;
  }

}
