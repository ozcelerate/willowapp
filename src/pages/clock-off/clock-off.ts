import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { WorkersModel } from '../../classes/worker.model';
import { WorkerService } from '../../providers/worker';

@Component({
  selector: 'page-clock-off',
  templateUrl: 'clock-off.html'
})
export class ClockOffPage {
  workers: WorkersModel = new WorkersModel();
  workersWorking: WorkersModel = new WorkersModel();
  workersFinished: WorkersModel = new WorkersModel();
  loading: any;
  hasDayStarted: boolean;
  //firstTime: boolean;

  constructor(
    public nav: NavController,
    public workerService: WorkerService,
    public loadingCtrl: LoadingController
  ) {
    //this.loading = this.loadingCtrl.create();
    //this.firstTime = true;
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter - clockOff");
    this.workers.items = this.workerService.getWorkersStatus().items;
    this.createViewArrays();
    if ((this.workersWorking.items.length + this.workersFinished.items.length) === 0) {
      this.hasDayStarted = false;
    } else this.hasDayStarted = true;

  }

  createViewArrays() {
    // parse the workers array to provide swm compilance indication
    // and whether the worker has started work or not.

    this.workersWorking.items = [];
    this.workersFinished.items = [];
    this.workers.items.map((worker) => {
      // do swm compliance
      console.log("print out worker")
      console.log(worker)

      // split workers into started and not started arrays - exclude
      // workers that are finished for the day
      if(worker.clockedOn === true) {
        console.log("clocked on detected ")
        console.log(worker)
        if(!worker.clockedOff) {
          console.log(worker.name + " is still working")
          this.workersWorking.items.push(worker);
        } else {
          console.log(worker.name + " has finished work")
          this.workersFinished.items.push(worker);
        }
      }
    });
    console.log("worker clocking")
    console.log(this.workersWorking.items)
  }
  // ionViewDidLoad() {
  //   this.loading.present();
  //   this.workerService
  //     .getData()
  //     .then(data => {
  //       this.notifications.today = data.today;
  //       this.notifications.yesterday = data.yesterday;
  //         this.loading.dismiss();
  //     });
  // }
}
