import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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
    public alertCtrl: AlertController
  ) { }

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
          if(worker.siteSelected) this.workersWorking.items.push(worker);
        } else {
          console.log(worker.name + " has finished work")
          if(worker.siteSelected) this.workersFinished.items.push(worker);
        }
      }
    });
    console.log("worker clocking")
    console.log(this.workersWorking.items)
  }

  startSignOff(worker) {
    console.log("start the signoff process for " + worker.name);
    let alert = this.alertCtrl.create({
      title: worker.name,
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sign Off',
          handler: data => {
            console.log("clock off with " + worker.name +  " " + data.password)
            console.log(worker.name)
            console.log(typeof data.password)
            if (data.password.localeCompare(worker.passcode) === 0) {
              worker.clockedOff = true;
              worker.clockOff = new Date().toTimeString().split(' ')[0];

              this.createViewArrays();
              // go back to signin page.
              //this.navCtrl.popToRoot();
            } else {
              console.log ("incorrect passcode");

            }
          }
        }
      ]
    });
    alert.present();
  }
}
