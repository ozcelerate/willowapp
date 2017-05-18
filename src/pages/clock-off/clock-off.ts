import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { WorkersModel } from '../../classes/worker.model';
import { WorkerService } from '../../providers/worker';

@Component({
  selector: 'clock-off-page',
  templateUrl: 'clock-off.html'
})
export class ClockOffPage {
  workers: WorkersModel = new WorkersModel();
  loading: any;

  constructor(
    public nav: NavController,
    public workerService: WorkerService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
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
