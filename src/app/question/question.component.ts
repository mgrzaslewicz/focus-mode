import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() public question: string;
  @Input() public answer1: string;
  @Input() public answer2: string;

  @Output() public onAnswer1: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onAnswer2: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public emitAnswer1() {
    this.onAnswer1.emit();
  }

  public emitAnswer2() {
    this.onAnswer2.emit();
  }

}
