import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Person } from "../../models/person";
import { VoteSliderComponent } from "../../components/vote-slider/vote-slider";
import { PersonFeederApiProvider } from "../../providers/person-feeder-api";
import { Subscription } from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-voting',
  templateUrl: 'voting.html',
})
export class VotingPage implements OnInit, OnDestroy {
  currentPerson: Person;
  currentVoteValue: number;
  votePlaced: boolean;
  isLoadingPeople: boolean;

  @ViewChild(VoteSliderComponent)
  private voteSlider: VoteSliderComponent;

  private activeSubscriptions: Subscription[] = [];

  ngOnInit() {
    this.activeSubscriptions.push(
      this.personFeeder.onPersonsLoading((isLoading: boolean) => {
        this.isLoadingPeople = isLoading;
      })
    );

    this.activeSubscriptions.push(
      this.personFeeder.onPersonProvided((person: Person) => {
        this.showNextPerson(person);
      })
    );

    this.personFeeder.provide();
  }

  constructor(public navCtrl: NavController, public personFeeder: PersonFeederApiProvider) {
  }

  showNextPerson(person: Person) {
    this.votePlaced = false;
    this.currentVoteValue = null;
    this.currentPerson = person;

    this.voteSlider.reset();
  }

  submitVote(voteValue: number) {
    this.votePlaced = true;
    this.currentVoteValue = voteValue;
  }

  ngOnDestroy(): void {
    this.activeSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
