import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'vote-slider',
  templateUrl: 'vote-slider.html'
})
export class VoteSliderComponent implements OnInit{

  private readonly DEFAULT_ICON_SIZE_PX = 42;

  voteValue: number;
  @Output()
  private voteSubmitted = new EventEmitter<number>();


  ngOnInit(): void {
    this.voteValue = 5.0;
  }

  constructor() {}

  onVoteSubmitted() {
    this.voteSubmitted.emit(this.voteValue);
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

  reset() {
    this.voteValue = 5.0
  }
}
