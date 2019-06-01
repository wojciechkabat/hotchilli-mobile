import { Component, Input, OnChanges } from '@angular/core';
import { Person } from "../../models/person";

@Component({
  selector: 'person-card',
  templateUrl: 'person-card.html'
})
export class PersonCardComponent {
  @Input()
  person: Person;

  constructor() {
  }

}
