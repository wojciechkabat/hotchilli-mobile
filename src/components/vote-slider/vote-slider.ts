import { Component } from '@angular/core';

@Component({
  selector: 'vote-slider',
  templateUrl: 'vote-slider.html'
})
export class VoteSliderComponent {

  voteValue: number;

  constructor() {}

  resolveCircleColor(): string {
    if(this.voteValue > 8) return '#fd495e';
    if(this.voteValue > 6) return '#e64e98';
    if(this.voteValue > 4) return '#b166bf';
    if(this.voteValue > 2) return '#6d78c9';
    return '#2980b9';
  }

  dupa() {
    console.log('asdsa')
  }
}
