import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Person } from "../../models/person";
import { VoteSliderComponent } from "../../components/vote-slider/vote-slider";

@IonicPage()
@Component({
  selector: 'page-voting',
  templateUrl: 'voting.html',
})
export class VotingPage {
  lastVotedPerson: Person;
  lastVotedValue: number;
  votePlaced: boolean;

  @ViewChild(VoteSliderComponent)
  private voteSlider: VoteSliderComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  showNextPerson() {
    this.votePlaced = false;
    this.lastVotedValue = null;
    this.voteSlider.reset();

    this.lastVotedPerson = new Person();
    this.lastVotedPerson.name = 'Magdalena';
    this.lastVotedPerson.age = 23;
    this.lastVotedPerson.averageVote = 5.5;
    this.lastVotedPerson.voteCount = 231;
  }

  submitVote(voteValue: number) {
    this.votePlaced = true;
    this.lastVotedValue = voteValue;

    this.lastVotedPerson = new Person();
    this.lastVotedPerson.name = 'Magdalena';
    this.lastVotedPerson.age = 23;
    this.lastVotedPerson.averageVote = 5.5;
    this.lastVotedPerson.voteCount = 231;
  }
}
