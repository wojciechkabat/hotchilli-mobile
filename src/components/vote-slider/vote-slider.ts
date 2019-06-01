import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vote-slider',
  templateUrl: 'vote-slider.html'
})
export class VoteSliderComponent implements OnInit{

  private readonly DEFAULT_ICON_SIZE_PX = 42;

  voteValue: number;


  ngOnInit(): void {
    this.voteValue = 5.0;
  }

  constructor() {}

  resolveCircleColor(): string {
    if(this.voteValue > 9) return '#fd495e';
    if(this.voteValue > 8.5) return '#ff5f4e';
    if(this.voteValue > 8) return '#ff773d';
    if(this.voteValue > 7) return '#ff8f2c';
    if(this.voteValue > 6) return '#ffa61b';
    if(this.voteValue > 5) return '#d5b607';
    if(this.voteValue > 4) return '#a8c128';
    if(this.voteValue > 3) return '#76c84e';
    if(this.voteValue > 2) return '#00be85';
    if(this.voteValue > 1) return '#00aeb0';
    return '#2980b9';
  }

  dupa() {
    console.log('asdsa')
  }

  sliderChanged(newValue: number): void {
    this.voteValue= 0.1*newValue;
  }

  getHotIconSizeValueStyle(currentVoteValue: number): string {
    let hotIconSize: number;
    if (currentVoteValue <= 5.0) {
      hotIconSize = this.DEFAULT_ICON_SIZE_PX;
    } else {
      hotIconSize = this.DEFAULT_ICON_SIZE_PX + 0.3*Math.pow(currentVoteValue,2);
    }
    return hotIconSize + 'px';
  }

  getColdIconSizeValueStyle(currentVoteValue: number): string {
    let coldIconSize: number;
    if (currentVoteValue >= 5.0) {
      coldIconSize = this.DEFAULT_ICON_SIZE_PX;
    } else {
      coldIconSize = this.DEFAULT_ICON_SIZE_PX + 0.3*Math.pow((10-currentVoteValue),2);;
    }
    return coldIconSize + 'px';
  }
}
