import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Person } from "../../models/person";

@Component({
  selector: 'summary',
  templateUrl: 'summary.html'
})
export class SummaryComponent {

  @HostListener('click')
  documentClick() {
    this.continueClicked.emit();
  }

  @Input()
  usersVote: number;
  @Input()
  person: Person;
  @Output()
  continueClicked = new EventEmitter();

  constructor() {
  }

}
