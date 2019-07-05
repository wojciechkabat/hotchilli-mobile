import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { InputLengthValidatorProvider } from "../../../../providers/inputLengthValidator";

@Component({
  selector: 'registration-credentials-step',
  templateUrl: 'registration-credentials-step.html'
})
export class RegistrationCredentialsStepComponent {

  @Input()
  registrationForm: FormGroup;

  @Output()
  public nextClicked = new EventEmitter();

  constructor(public inputLengthValidator: InputLengthValidatorProvider) {}

}
