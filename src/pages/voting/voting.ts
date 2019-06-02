import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Person } from "../../models/person";
import { VoteSliderComponent } from "../../components/vote-slider/vote-slider";
import { PersonFeederApiProvider } from "../../providers/person-feeder-api";
import { Subscription } from "rxjs/Subscription";
import { VoteService } from "../../providers/vote-service";
import { Vote } from "../../models/vote";

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

  constructor(public navCtrl: NavController, public personFeeder: PersonFeederApiProvider, private voteService: VoteService) {
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
    this.voteService.persistVote(
      new Vote(this.currentPerson.id, parseFloat(voteValue.toFixed(1)))
    ).subscribe(() => {
    }, (error) => {
      //fixme figure out a mechanism for storing errors and retrying
    });
  }

  ngOnDestroy(): void {
    this.activeSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
