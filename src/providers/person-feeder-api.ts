import { Injectable, OnInit } from '@angular/core';
import { Person } from "../models/person";
import { Observable } from "rxjs/Observable";
import { Api } from "./api";
import { Subject } from "rxjs/Subject";


@Injectable()
export class PersonFeederApiProvider {
  private localPersons: Person[] = [];
  private personFeederSubject = new Subject<Person>();
  private personLoadingSubject = new Subject<boolean>();

  constructor(private apiService: Api) {
  }

  provide() {
    if (this.localPersons.length > 0) {
      this.personFeederSubject.next(this.localPersons.shift());
    } else {
      this.personLoadingSubject.next(true);
      this.fetchNextPeople(20).subscribe((persons: Person[]) => {
        persons.forEach(person => this.localPersons.push(person));
        this.personFeederSubject.next(this.localPersons.shift());
        this.personLoadingSubject.next(false);
      })
    }
  }

  fetchNextPeople(numberOfPeople: number): Observable<Person[]> {
    return this.apiService.get(`users/random?number=${numberOfPeople}`);
  }

  onPersonProvided(personObserver: ((person: Person) => void)) {
    return this.personFeederSubject.subscribe(personObserver);
  }

  onPersonsLoading(personLoadingObserver: ((boolean) => void)) {
    return this.personLoadingSubject.subscribe(personLoadingObserver);
  }
}
