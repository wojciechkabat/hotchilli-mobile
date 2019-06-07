import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PopupService } from "../../providers/popupService";

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  @Output()
  private loginClicked = new EventEmitter();
  @Output()
  backClicked = new EventEmitter();
  @Input()
  isRequestPending: boolean;

  constructor(private formBuilder: FormBuilder,
              private popupService: PopupService) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.popupService.displayToast('CREDENTIALS_MISSING_OR_INCORRECT_FORMAT');
      return;
    }
    this.loginClicked.emit(this.loginForm.value)
  }
}
