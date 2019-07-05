import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-error',
  templateUrl: 'form-error.html'
})
export class FormErrorComponent {

  @Input()
  message: string;

  constructor() {}

}
