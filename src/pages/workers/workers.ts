import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WorkersOnsitePage } from '../workers-onsite/workers-onsite';

/**
 * Generated class for the Workers page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-workers',
  templateUrl: 'workers.html'
})
export class WorkersPage {
  items: Array<{title: string, note?: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      { title: 'Onsite', component: WorkersOnsitePage },
    ];
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad Workers');
  // }

  itemTapped(event, item) {
    this.navCtrl.push(item.component);
  }

}
