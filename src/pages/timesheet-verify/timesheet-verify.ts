import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TimesheetsModel } from '../../classes/timesheet.model';
import { TimesService } from '../../providers/times';

/**
 * Generated class for the TimesheetVerify page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-timesheet-verify',
  templateUrl: 'timesheet-verify.html',
})
export class TimesheetVerifyPage {
  loading: any;
  timesheets: TimesheetsModel = new TimesheetsModel();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private timesService: TimesService,
              public loadingCtrl: LoadingController) {
      this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesheetVerify');
    this.loading.present();
    this.timesService
      .getData()
      .then(data => {
        console.log("got timesheet data in verify times")
        this.timesheets.times = data.times;
        this.loading.dismiss();
      });

  }

}
