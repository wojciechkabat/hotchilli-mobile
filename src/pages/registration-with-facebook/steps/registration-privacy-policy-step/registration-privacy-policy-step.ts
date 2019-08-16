import { Component, EventEmitter, Output } from '@angular/core';
import { PrivacyPolicyService } from "../../../../providers/privacyPolicy";

@Component({
  selector: 'registration-privacy-policy-step',
  templateUrl: 'registration-privacy-policy-step.html'
})
export class RegistrationPrivacyPolicyStepComponent {
  @Output()
  public nextClicked = new EventEmitter();
  @Output()
  public previousClicked = new EventEmitter();

  constructor(public privacyPolicyService: PrivacyPolicyService) {}

}
