import {Injectable, OpaqueToken} from '@angular/core';
import {SuccessCallback, ErrorCallback} from '../../shared/callback';
import {LocalStorageService} from 'angular-2-local-storage';
import {GoalsJson, Goals, GoalJson, Goal} from '../../task/goal';

export class GoalsFromJsonMapper {

  public createGoalsFrom(goalsJson: GoalsJson): Goals {
    let result: Goals = new Goals([]);
    if (goalsJson != null) {
      result = new Goals(this.createGoalListFrom(goalsJson.goals));
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
  getGoals(successCallback: SuccessCallback<Goals>, errorCallback?: ErrorCallback): void;
  saveGoals(goals: Goals, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback): void;
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

  public getGoals(successCallback: SuccessCallback<Goals>, errorCallback?: ErrorCallback) {
    let result: Goals = this.goalsFromJsonMapper.createGoalsFrom(<GoalsJson> this.localStorageService.get(`goals`));
    successCallback(result);
  }

  public saveGoals(goals: Goals, successCallback: SuccessCallback<any>, errorCallback?: ErrorCallback) {
    this.localStorageService.set(`goals`, goals.asJson());
    successCallback(null);
  }

}
