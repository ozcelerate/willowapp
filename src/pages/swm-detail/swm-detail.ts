import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SwmDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-swm-detail',
  templateUrl: 'swm-detail.html'
})
export class SwmDetailPage {
  swmid: number;
  swm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("swmDetail constructor")
    this.swmid = this.navParams.get('id')
    console.log("show swm details for id " + this.swmid);
    this.swm = this.navParams.get('swm');
    console.log(this.swm)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwmDetailPage');
  }

}
