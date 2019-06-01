import { Component, Input } from '@angular/core';

@Component({
  selector: 'score-circle',
  templateUrl: 'score-circle.html'
})
export class ScoreCircleComponent {

  @Input()
  currentValue: number;

  constructor() {
  }

  resolveCircleColor(): string {
    if(this.currentValue > 9) return '#fd495e';
    if(this.currentValue > 8.5) return '#ff5f4e';
    if(this.currentValue > 8) return '#ff773d';
    if(this.currentValue > 7) return '#ff8f2c';
    if(this.currentValue > 6) return '#ffa61b';
    if(this.currentValue > 5) return '#d5b607';
    if(this.currentValue > 4) return '#a8c128';
    if(this.currentValue > 3) return '#76c84e';
    if(this.currentValue > 2) return '#00be85';
    if(this.currentValue > 1) return '#00aeb0';
    return '#2980b9';
  }

}
