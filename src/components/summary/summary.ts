import { Component, Input } from '@angular/core';
import { Person } from "../../models/person";

@Component({
  selector: 'summary',
  templateUrl: 'summary.html'
})
export class SummaryComponent {

  @Input()
  usersVote: number;
  @Input()
  person: Person;

  constructor() {
  }

}
