import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { WorkersModel } from '../../classes/worker.model';
import { WorkerService } from '../../providers/worker';
import { SwmService } from '../../providers/swm';
import { SwmPage } from '../swm/swm';
/*
  Generated class for the ClockOn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-clock-on',
  templateUrl: 'clock-on.html'
})
export class ClockOnPage {

  workerlist: WorkersModel = new WorkersModel();
  workersNotStarted: WorkersModel = new WorkersModel();
  workersStarted: WorkersModel = new WorkersModel();
  loading: any;

  constructor(
    public nav: NavController,
    public workerService: WorkerService,
    public swmService: SwmService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
    this.workersNotStarted.items = [];
    this.workersStarted.items = [];
  }

  //ionViewDidLoad() {
  ionViewDidEnter() {
    this.loading.present();
    let rqswms = this.swmService.getRequiredSwms();
    this.workersStarted.items = [];
    this.workersNotStarted.items = [];
    console.log("list of required swms are " )
    console.log(rqswms)
    this.workerService
      .getData()
      .then(data => {
        this.workerlist.items = data.items;
        console.log("got the worker data from service")
        console.log(this.workerlist.items)
        // process the workerlist for swm compliance and statuses
        this.workerlist.items.map((worker) => {
          // do swm compliance
          console.log("print out worker")
          console.log(worker)
          worker.swmCompliant = true;
          // if supervisor hasn't generated the swms yet then don't calc
          if(typeof rqswms !== 'undefined') {
            rqswms.forEach((rs) => {
              console.log(rs)
              console.log(worker.validSwms)
              console.log(worker.validSwms.indexOf(rs))
              if(worker.validSwms.indexOf(rs) === -1) {
                // one of the required swms for the day isn't in the workers completed swm courses
                worker.swmCompliant = false;
                console.log("non compliant worker")
                return
              }
            });
          } else {
            // set swmsNotSet flag

          }

          // split workers into started and not started arrays - exclude
          // workers that are finished for the day
          if(worker.startedWork) {
            if(!worker.finishedWork) {
              this.workersStarted.items.push(worker);
            }
          } else {
            this.workersNotStarted.items.push(worker);
          }
        })
        this.loading.dismiss();
      });
  }




  startSignIn(worker) {
    console.log("start the signin process");
    this.nav.push(SwmPage, {'worker': worker});

  }
}
