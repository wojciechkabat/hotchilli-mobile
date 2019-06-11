import { Component, Input } from '@angular/core';

@Component({
  selector: 'picture-setting-card',
  templateUrl: 'picture-setting-card.html'
})
export class PictureSettingCardComponent {

  @Input()
  pictureUrl: string;

  constructor() {
  }

}
