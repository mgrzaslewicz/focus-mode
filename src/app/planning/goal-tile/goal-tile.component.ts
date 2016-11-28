import {Component, OnInit, Inject} from '@angular/core';
import {GoalServiceToken, GoalService} from '../../execute-plan/focused-task/goal.service';
import {Goals} from '../../task/goal';

@Component({
  selector: 'goal-tile',
  templateUrl: './goal-tile.component.html',
  styleUrls: ['./goal-tile.component.css']
})
export class GoalTileComponent implements OnInit {
  private goalService: GoalService;
  private goals: Goals;
  private isShowingQuestion: boolean = false;

  constructor(@Inject(GoalServiceToken) goalService: GoalService) {
    this.goalService = goalService;
  }

  ngOnInit() {
    this.goalService.getGoals((goals: Goals) => this.setGoals(goals));
  }

  private setGoals(goals: Goals) {
    this.goals = goals;
  }


  public addGoalFromDraft() {
    this.goals.addGoalFromDraft();
    this.saveGoals();
  }

  public saveGoals() {
    this.goalService.saveGoals(this.goals, () => {
    });
  }

  public clearGoals() {
    this.goals.clearGoals();
    this.saveGoals();
    this.hideQuestion();
  }

  public removeGoal(goalIndexZeroBased: number) {
    this.goals.removeGoal(goalIndexZeroBased);
    this.saveGoals();
  }

  public editGoal(goalIndexZeroBased: number) {
    this.goals.moveGoalToDraft(goalIndexZeroBased);
    this.saveGoals();
  }

  public moveGoalDown(goalIndexZeroBased: number) {
    this.goals.moveGoalDown(goalIndexZeroBased);
    this.saveGoals();
  }

  public moveGoalUp(goalIndexZeroBased: number) {
    this.goals.moveGoalUp(goalIndexZeroBased);
    this.saveGoals();
  }

  public showQuestion() {
    this.isShowingQuestion = true;
  }

  public hideQuestion() {
    this.isShowingQuestion = false;
  }

}
