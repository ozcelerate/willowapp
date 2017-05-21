import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { SwmsModel } from '../../classes/swm.model';
import { SwmService } from '../../providers/swm';

import { WorkerModel } from '../../classes/worker.model';

import { SafetyFocusPage } from '../safety-focus/safety-focus';

/*
  Generated class for the Swm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-swm',
  templateUrl: 'swm.html'
})
export class SwmPage {
  worker: WorkerModel;
  loading: any;
  //swmlist: SwmsModel = new SwmsModel();
  activeSWMs: SwmsModel = new SwmsModel(); // these are determined from the tasks

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public swmService: SwmService,
              public loadingCtrl: LoadingController) {
      this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwmPage');
    this.worker = this.navParams.get('worker');
    console.log(this.worker)

    this.activeSWMs.items = this.swmService
      .getSwmList().items.filter((swm) => {
        // firstly, set the traffic light based on if worker has done swm courses
        if(this.worker.validSwms.indexOf(swm.id) < 0 ) {
          swm.red = true;
          swm.yellow = false;
          swm.green = false;
        } else {
          swm.red = false;
          swm.yellow = false;
          swm.green = true;
        }

        // add if in use
        return swm.inuse
      });
    console.log("got active swm list")
    console.log(this.activeSWMs.items)
  }

  gotoSafetyFocus() {
    console.log("gotoSafetyFocus")
    this.navCtrl.push(SafetyFocusPage, {'worker': this.worker});

  }

}
