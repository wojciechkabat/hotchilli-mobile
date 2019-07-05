import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";


@Injectable()
export class InputLengthValidatorProvider {

  constructor() {}

  public validate(event: any, maxLength: number, formElement: FormControl) {
    let newValue = event.target.value;
    if (newValue.length >= maxLength) {
      formElement.setValue(newValue.slice(0, maxLength));
    }
  }
}
