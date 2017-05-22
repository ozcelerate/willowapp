import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WorkerModel } from '../../classes/worker.model';
import { SafetyFocusModel } from '../../classes/safety-focus.model';
//import { SafetyFocusService } from '../../providers/safety-focus';
/*
  Generated class for the SafetyFocusDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-safety-focus-detail',
  templateUrl: 'safety-focus-detail.html'
})
export class SafetyFocusDetailPage {

  worker: WorkerModel;
  safetyFocus: SafetyFocusModel = new SafetyFocusModel();
  actionsExist: boolean = false;
  sfAccepted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.safetyFocus = this.navParams.get("safetyFocus");
    if (typeof this.safetyFocus.actions !== 'undefined' && this.safetyFocus.actions !== "") {
      this.actionsExist = true;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyFocusDetailPage');
  }

  

}
