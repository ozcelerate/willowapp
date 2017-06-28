import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Tudomundo } from '../../providers/tudomundo';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };

  constructor(public nav: NavController, private tudomundoService: Tudomundo) {
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      email: new FormControl('d@vt.com', Validators.required),
      password: new FormControl('test', Validators.required)
    });
  }

  doLogin(){
    console.log(this.login.value);
    // just for mock testing while there is no backend -- supervisor role
    // if s@w.com = supervisor else any worker role

    if (this.login.value.email === "d@vt.com") {
      console.log("supervisor logged in");
      this.tudomundoService.setLenny(true, "supervisor", "login done")
    } else {
      console.log("Worker logged in")
    }
    this.nav.setRoot(this.main_page.component);
  }

  doFacebookLogin() {
    this.nav.setRoot(this.main_page.component);
  }

  doGoogleLogin() {
    this.nav.setRoot(this.main_page.component);
  }

  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

}
