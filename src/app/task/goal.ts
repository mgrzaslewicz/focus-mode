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

}

export interface GoalJson {
  name: string;
}

export interface GoalSystemJson {
  goals: Array<GoalJson>;
}

export class GoalSystem {
  private goals: Array<Goal>;
  private draftGoalName: string;

  constructor(goalList: Array<Goal>) {
    this.goals = goalList;
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

  public clearGoals() {
    this.goals = [];
  }

  public asJson(): GoalSystemJson {
    return {
      goals: this.getGoalSystemAsJson()
    }
  }

  public getGoalSystemAsJson(): Array<GoalJson> {
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
