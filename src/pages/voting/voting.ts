import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Person } from "../../models/person";
import { VoteSliderComponent } from "../../components/vote-slider/vote-slider";
import { PersonFeederProvider } from "../../providers/person-feeder";

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
    this.showNextPerson();
  }

  constructor(public navCtrl: NavController, private personFeeder: PersonFeederProvider) {

  }

  showNextPerson() {
    this.votePlaced = false;
    this.currentVoteValue = null;
    this.currentPerson = this.personFeeder.provide();

    if (this.currentPerson) {
      this.voteSlider.reset();
    }

    this.isLoadingPeople = !this.currentPerson;
  }

  submitVote(voteValue: number) {
    this.votePlaced = true;
    this.currentVoteValue = voteValue;
  }
}
