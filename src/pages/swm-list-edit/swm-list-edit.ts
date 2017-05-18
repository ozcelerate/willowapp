import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SwmsModel } from '../../classes/swm.model';

import { SwmService } from '../../providers/swm';
/*
  Generated class for the SwmListEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

/*
  Let's assume that we can only get to this page from the prestart page.
  We can therefore assume that the swm service will be already populated
  and correct.
*/
@Component({
  selector: 'page-swm-list-edit',
  templateUrl: 'swm-list-edit.html'
})
export class SwmListEditPage {

  swmlist: SwmsModel = new SwmsModel();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public swmService: SwmService) {
    console.log("swm list edit page constructor")
    this.swmlist = this.swmService.getSwmList();
    console.log(this.swmlist.items)
    console.log("how did that go???")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwmListEditPage');
  }

  ionViewWillLeave() {
    console.log("about to leave swm list edit page ... update services??")
    this.swmService.updateSwmList(this.swmlist);
    // also update the required swm list in the service
    let rqswms: number[] = []
    this.swmlist.items.forEach((swm) => {
      // only if the task is active
      if (swm.inuse) {
        rqswms.push(swm.id);
      }
    });
    this.swmService.setRequiredSwms(rqswms);
    console.log("just set required swms")
    console.log(rqswms)
  }

}
