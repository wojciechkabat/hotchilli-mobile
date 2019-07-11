import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Person } from "../../models/person";
import { PictureService } from "../../providers/pictureService";
import { ModalController } from "ionic-angular";
import { GalleryModal } from "ionic-gallery-modal";

@Component({
  selector: 'person-card',
  templateUrl: 'person-card.html'
})
export class PersonCardComponent implements OnChanges {
  @Input()
  person: Person;

  @ViewChild('pictureSlider') pictureSlider;

  constructor(public pictureService: PictureService, private modalCtrl: ModalController) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pictureSlider) {
      this.pictureSlider.slideTo(0, 1);
      this.pictureSlider.update();
    }
  }

  openFullScreen() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.person.pictures,
      initialSlide: this.pictureSlider.realIndex
    });
    modal.present();
  }
}
