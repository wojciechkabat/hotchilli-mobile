import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../providers/userService";
import { Person } from "../../models/person";
import { DatePicker } from "@ionic-native/date-picker";
import { UpdateProfileDto } from "../../models/updateProfileDto";
import { PopupService } from "../../providers/popupService";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  userDataForm: FormGroup;
  userDataCopy: Person;

  minDate: Date;
  isSaving: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private popupService: PopupService,
              private datePicker: DatePicker,
              private userService: UserService) {
    this.userDataCopy = Object.assign({}, userService.userData);

    this.userDataForm = this.formBuilder.group({
      username: [this.userDataCopy.username, Validators.required],
      sex: [this.userDataCopy.gender, Validators.required],
      birthday: [this.userDataCopy.dateOfBirth]
    });

    this.minDate = new Date();
    this.minDate.setFullYear(1920);
    this.minDate.setMonth(0);
    this.minDate.setDate(1);
  }

  showDatePicker() {
    this.datePicker.show({
      date: new Date(this.userDataCopy.dateOfBirth),
      minDate: this.minDate.valueOf(),
      maxDate: new Date().valueOf(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
        if (date) {
          this.userDataCopy.dateOfBirth = date;
          this.userDataForm.controls['birthday'].setValue(date);
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  saveChanges() {
    this.isSaving = true;
    const formValue = this.userDataForm.value;
    this.userService.updateProfileInformation(new UpdateProfileDto(formValue.username, formValue.birthday, formValue.sex))
      .subscribe((person) => {
        this.isSaving = false;
        this.navCtrl.pop().then(() => {
          this.popupService.displayToast('Changes successfully saved')
        })
      }, (error) => {
        console.error(error);
        this.isSaving = false;
      })
  }
}
