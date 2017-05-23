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
  firstTime: boolean;

  constructor(
    public nav: NavController,
    public workerService: WorkerService,
    public swmService: SwmService,
    public loadingCtrl: LoadingController
  ) {
    console.log("ClockOnPage constructor");
    this.firstTime = true;
    this.loading = this.loadingCtrl.create();
    // this.workersNotStarted.items = [];
    // this.workersStarted.items = [];
    // this.workerService.getData().then(data => {
    //   console.log("got worker data from service in clockOn constructor");
    //   // just for mock data we only need to do this once
    //   this.workerlist.items = data.items;
    //   // now store the data back in the service (could have just )
    //
    // })
  }

  //ionViewDidLoad() {
  ionViewDidEnter() {
    console.log("ionViewDidEnter - clockOn " + this.firstTime);
    // update service so signOff page knows about changes

    if (this.firstTime) {
      this.loading.present();
      this.workerService
        .getData()
        .then(data => {
          this.firstTime = false;
          this.workerlist.items = data.items;
          console.log("got the worker data from service")
          console.log(this.workerlist.items)
          // process the workerlist for swm compliance and statuses
          this.createViewArrays();
          this.loading.dismiss();
          this.workerService.setWorkersStatus(this.workerlist);
          
        });
    } else {
      console.log("clockOn page - not first time")
      this.createViewArrays();
      this.workerService.setWorkersStatus(this.workerlist);

    }


  }

  createViewArrays() {
    // parse the workers array to provide swm compilance indication
    // and whether the worker has started work or not.
    let rqswms = this.swmService.getRequiredSwms();
    console.log("list of required swms are " )
    console.log(rqswms)
    this.workersStarted.items = [];
    this.workersNotStarted.items = [];
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
      if(worker.clockedOn === true) {
        console.log("clocked on detected ")
        console.log(worker)
        if(!worker.clockedOff) {
          console.log(worker.name + " has started work")
          this.workersStarted.items.push(worker);
        } else {
          console.log(worker.name + " has finished work so not included")
        }
      } else {
        console.log("worker not started " + worker.name)
        this.workersNotStarted.items.push(worker);
      }
    });
    console.log("worker clocking")
    console.log(this.workersStarted.items)
  }




  startSignIn(worker) {
    console.log("start the signin process");
    this.nav.push(SwmPage, {'worker': worker});

  }
}
