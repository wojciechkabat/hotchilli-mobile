import { Injectable, OnInit } from '@angular/core';
import { Person } from "../models/person";
import { Observable } from "rxjs/Observable";
import { Api } from "./api";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { Constants } from "./constants";
import { UserService } from "./userService";


@Injectable()
export class PersonFeederApiProvider {
  private localPersons: Person[] = [];
  private personFeederSubject = new Subject<Person>();
  private personLoadingSubject = new Subject<boolean>();

  constructor(private apiService: Api, private userService: UserService) {
  }

  provide() {
    if (this.localPersons.length > 0) {
      this.personFeederSubject.next(this.localPersons.shift());
    } else {
      this.personLoadingSubject.next(true);
      this.fetchNextPeople().subscribe((persons: Person[]) => {
        persons.forEach(person => this.localPersons.push(person));
        this.personFeederSubject.next(this.localPersons.shift());
        this.personLoadingSubject.next(false);
      }, (error) => {
        //fixme handle error
      })
    }
  }

  fetchNextPeople(): Observable<Person[]> {
    if (this.userService.isLoggedIn) {
      return this.apiService.get(`users/random?number=${Constants.NUMBER_OF_PERSONS_IN_SINGLE_CALL}`);
    }
    return this.apiService.get(`guest/users/random?number=${Constants.NUMBER_OF_PEOPLE_TO_FETCH_FOR_GUESTS}`)
  }

  onPersonProvided(personObserver: ((person: Person) => void)): Subscription {
    return this.personFeederSubject.subscribe(personObserver);
  }

  onPersonsLoading(personLoadingObserver: ((boolean) => void)): Subscription {
    return this.personLoadingSubject.subscribe(personLoadingObserver);
  }
}
