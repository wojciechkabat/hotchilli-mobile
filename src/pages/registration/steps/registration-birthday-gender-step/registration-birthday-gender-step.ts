import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { DatePicker } from "@ionic-native/date-picker";

@Component({
  selector: 'registration-birthday-gender-step',
  templateUrl: 'registration-birthday-gender-step.html'
})
export class RegistrationBirthdayGenderStep implements OnInit {

  @Input()
  registrationForm: FormGroup;
  birthday: Date;
  minDate: Date;

  @Output()
  public nextClicked = new EventEmitter();

  @Output()
  public previousClicked = new EventEmitter();


  ngOnInit(): void {
    this.initDefaultDates();
  }

  constructor(private datePicker: DatePicker) {}

  showDatePicker() {
    this.datePicker.show({
      date: this.birthday,
      minDate: this.minDate.valueOf(),
      maxDate: new Date().valueOf(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
        if (date) {
          this.birthday = date;
          this.registrationForm.controls['birthday'].setValue(date);
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  private initDefaultDates() {
    this.birthday = new Date();
    this.birthday.setFullYear(2000);
    this.birthday.setMonth(0);
    this.birthday.setDate(1);
    this.registrationForm.controls['birthday'].setValue(this.birthday);

    this.minDate = new Date();
    this.minDate.setFullYear(1920);
    this.minDate.setMonth(0);
    this.minDate.setDate(1);
  }
}
