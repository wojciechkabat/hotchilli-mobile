import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Person } from "../../models/person";
import { VoteSliderComponent } from "../../components/vote-slider/vote-slider";
import { PersonFeederApiProvider } from "../../providers/person-feeder-api";

@IonicPage()
@Component({
  selector: 'page-voting',
  templateUrl: 'voting.html',
})
export class VotingPage implements OnInit {
  currentPerson: Person;
  currentVoteValue: number;
  votePlaced: boolean;
  isLoadingPeople: boolean;

  @ViewChild(VoteSliderComponent)
  private voteSlider: VoteSliderComponent;

  ngOnInit() {
    this.personFeeder.onPersonsLoading((isLoading: boolean) => {
      this.isLoadingPeople = isLoading;
    });

    this.personFeeder.onPersonProvided((person: Person) => {
      this.showNextPerson(person);
    });

    this.personFeeder.provide();
  }

  constructor(public navCtrl: NavController, public personFeeder: PersonFeederApiProvider) {}

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
}
