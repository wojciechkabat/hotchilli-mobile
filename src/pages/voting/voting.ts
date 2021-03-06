import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Person } from "../../models/person";
import { VoteSliderComponent } from "../../components/vote-slider/vote-slider";
import { PersonFeederApiProvider } from "../../providers/person-feeder-api";
import { Subscription } from "rxjs/Subscription";
import { VoteService } from "../../providers/vote-service";
import { Vote } from "../../models/vote";
import { Constants } from "../../providers/constants";
import { LoginService } from "../../providers/loginService";
import { BackButtonService } from "../../providers/backButtonService";
import { UserService } from "../../providers/userService";

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
  guestVoteLimitExceeded: boolean;

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

  constructor(public navCtrl: NavController,
              private backButtonService: BackButtonService,
              public personFeeder: PersonFeederApiProvider,
              private userService: UserService,
              private voteService: VoteService) {
  }


  summaryPageClicked() {
    if(!this.guestVoteLimitExceeded) {
      this.personFeeder.provide();
    }
  }

  submitVote(newVote: number) {
    this.recalculateVoteDataWithNewVote(newVote, this.currentPerson);
    this.currentVoteValue = newVote;
    this.votePlaced = true;

    this.voteService.persistVote(
      new Vote(
        this.currentPerson.id,
        parseFloat(newVote.toFixed(1))
      )
    ).subscribe(() => {
    }, (error) => {
      if (error.error.statusCode === Constants.ERROR_CODES.GUEST_VOTE_LIMIT_EXCEEDED) {
        this.guestVoteLimitExceeded = true;
      }
    });
  }

  openSettings() {
    this.navCtrl.push('SettingsPage', {}, {animate: true, direction: 'back'})
  }

  private showNextPerson(person: Person) {
    this.votePlaced = false;
    this.currentVoteValue = null;
    this.currentPerson = person;

    if(this.voteSlider) {
      this.voteSlider.reset();
    }
  }

  private recalculateVoteDataWithNewVote(newVote: number, person: Person) {
    this.currentPerson.averageRating = (person.averageRating*person.voteCount + newVote)/(person.voteCount + 1);
    this.currentPerson.voteCount++;
  }

  ngOnDestroy(): void {
    this.activeSubscriptions.forEach(sub => sub.unsubscribe());
  }


  ionViewDidEnter() {
    this.backButtonService.registerAppExitBackButtonAction();
    if(this.userService.isCompleteRefreshRequired) {
      this.personFeeder.clearAndProvide();
      this.userService.isCompleteRefreshRequired = false;
    }
  }

  ionViewWillLeave() {
    this.backButtonService.unregisterCustomBackButtonAction();
  }
}
