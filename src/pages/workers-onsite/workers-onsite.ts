import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WorkersModel } from '../../classes/worker.model';
import { WorkerService } from '../../providers/worker';
/**
 * Generated class for the WorkersOnsite page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-workers-onsite',
  templateUrl: 'workers-onsite.html',
})
export class WorkersOnsitePage {
  workers: WorkersModel = new WorkersModel();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private workerService: WorkerService) {
      this.workers.items = this.workerService.getWorkersStatus().items;
  }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad WorkersOnsite');
  // }


}
