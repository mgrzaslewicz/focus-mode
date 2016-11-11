import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'rectangle-progress-bar',
  templateUrl: './rectangle-progress-bar.component.html',
  styleUrls: ['./rectangle-progress-bar.component.css']
})
export class RectangleProgressBarComponent implements OnInit {
  @Input()
  public progressPercent: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  public getWidthStyle(): string {
    return `width: ${this.progressPercent}%`;
  }
}
