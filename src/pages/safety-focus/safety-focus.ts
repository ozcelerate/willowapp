import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { WorkerModel } from '../../classes/worker.model';
import { SafetyFocusesModel } from '../../classes/safety-focus.model';
import { SafetyFocusService } from '../../providers/safety-focus';

import { SafetyFocusDetailPage } from '../safety-focus-detail/safety-focus-detail';
import { SafetyIssuesPage } from '../safety-issues/safety-issues';

/*
  Generated class for the SafetyFocus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-safety-focus',
  templateUrl: 'safety-focus.html'
})
export class SafetyFocusPage {

  worker: WorkerModel;
  safetyFocuses: SafetyFocusesModel = new SafetyFocusesModel();
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public safetyFocusService: SafetyFocusService,
              public loadingCtrl: LoadingController) {
    this.worker = this.navParams.get('worker');
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyFocusPage');
    this.safetyFocusService.getData().then((sfd) => {
      console.log("got the safter focus data");
      this.safetyFocuses.items = sfd.items;
      console.log(this.safetyFocuses);
      this.loading.dismiss();

    });
  }

  gotoSafetyFocusDetail(safetyFocus) {
    console.log("gotoSafetyFocusDetail")
    this.navCtrl.push(SafetyFocusDetailPage, {'worker': this.worker, 'safetyFocus': safetyFocus});
  }

  gotoSafetyIssues() {
    console.log("gotoSafetyIssues")
    this.navCtrl.push(SafetyIssuesPage, {'worker': this.worker});
  }

}
