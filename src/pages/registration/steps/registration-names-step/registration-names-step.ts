import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { InputLengthValidatorProvider } from "../../../../providers/inputLengthValidator";

@Component({
  selector: 'registration-names-step',
  templateUrl: 'registration-names-step.html'
})
export class RegistrationNamesStepComponent {

  @Input()
  registrationForm: FormGroup;

  @Output()
  public nextClicked = new EventEmitter();


  @Output()
  public previousClicked = new EventEmitter();

  constructor(public inputLengthValidator: InputLengthValidatorProvider) {}

}
