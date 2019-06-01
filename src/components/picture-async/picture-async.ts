import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'picture-async',
  templateUrl: 'picture-async.html'
})
export class PictureAsyncComponent implements OnChanges{

  @Input()
  pictureUrl: string;

  isPictureLoaded: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    this.isPictureLoaded = false;
  }

}
