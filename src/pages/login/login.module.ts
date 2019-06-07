import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { LoginFormComponent } from "../../components/login-form/login-form";

@NgModule({
  declarations: [
    LoginPage,
    LoginFormComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
