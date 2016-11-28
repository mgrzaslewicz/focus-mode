import {Injectable, OpaqueToken} from '@angular/core';
import {SuccessCallback, ErrorCallback} from '../../shared/callback';
import {LocalStorageService} from 'angular-2-local-storage';
import {GoalSystemJson, GoalSystem, GoalJson, Goal} from '../../task/goal';

export class GoalsFromJsonMapper {

  public createGoalsFrom(goalsJson: GoalSystemJson): GoalSystem {
    let result: GoalSystem = new GoalSystem([]);
    if (goalsJson != null) {
      result = new GoalSystem(this.createGoalListFrom(goalsJson.goals));
    }
    return result;
  }

  private createGoalListFrom(goalJsonList: Array<GoalJson>): Array<Goal> {
    let result: Array<Goal> = [];
    if (goalJsonList != null) {
      goalJsonList.forEach((goalJson: GoalJson) => {
        result.push(this.createGoalFrom(goalJson));
      });
    }
    return result;
  }

  private createGoalFrom(goalJson: GoalJson): Goal {
    return new Goal(goalJson.name);
  }

}

export interface GoalService {
  getGoals(successCallback: SuccessCallback<GoalSystem>, errorCallback?: ErrorCallback): void;
  saveGoals(goals: GoalSystem, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback): void;
}

export const GoalServiceToken = new OpaqueToken('goalService');


@Injectable()
export class LocalStorageGoalService implements GoalService {
  private localStorageService: LocalStorageService;
  private goalsFromJsonMapper: GoalsFromJsonMapper;

  constructor(localStorageService: LocalStorageService, goalsFromJsonMapper: GoalsFromJsonMapper) {
    this.localStorageService = localStorageService;
    this.goalsFromJsonMapper = goalsFromJsonMapper;
  }

  public getGoals(successCallback: SuccessCallback<GoalSystem>, errorCallback?: ErrorCallback) {
    let result: GoalSystem = this.goalsFromJsonMapper.createGoalsFrom(<GoalSystemJson> this.localStorageService.get(`goals`));
    successCallback(result);
  }

  public saveGoals(goals: GoalSystem, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback) {
    this.localStorageService.set(`goals`, goals.asJson());
    successCallback(null);
  }

}
