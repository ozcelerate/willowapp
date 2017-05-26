import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { WorkerModel } from '../../classes/worker.model';
import { SafetyIssuesModel } from '../../classes/safety-issue.model';
import { SafetyIssueService } from '../../providers/safety-issue';

/*
  Generated class for the SafetyIssues page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-safety-issues',
  templateUrl: 'safety-issues.html'
})
export class SafetyIssuesPage {
  loading: any;
  worker: WorkerModel;
  safetyIssues: SafetyIssuesModel = new SafetyIssuesModel();
  issueList: boolean[] = [];
  allChecked: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public safetyIssueService: SafetyIssueService,
              public alertCtrl: AlertController) {
    this.worker = this.navParams.get('worker');
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyIssuesPage');
    this.loading.present();
    this.safetyIssueService.getData().then((issues) => {
      console.log("got the safter issue data");
      this.safetyIssues.items = issues.items
      this.loading.dismiss();

    });
  }

  verifyAllChecked() {
    console.log("check if all issues read");
    let ac = true;
    this.safetyIssues.items.map((si) => {
      ac = ac && si.issueChecked
    })
    this.allChecked = ac;
  }

  // clockOn() {
  //   console.log("implement clock on");
  //   // modal / action sheet with pass code
  // }

  clockOn() {
    let alert = this.alertCtrl.create({
      title: this.worker.name,
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
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
          text: 'Sign On',
          handler: data => {
            console.log("clock on with " + data.username +  " " + data.password)
            console.log(this.worker.name)
            console.log(typeof data.password)
            if (data.password.localeCompare(this.worker.passcode) === 0) {
              this.worker.clockedOn = true;
              this.worker.clockOn = new Date().toTimeString().split(' ')[0];

              // go back to signin page.
              this.navCtrl.popToRoot();
            } else {
              console.log ("incorrect passcode");

            }
            // if (User.isValid(data.username, data.password)) {
            //   // logged in!
            // } else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    });
    alert.present();
  }

  public onSelectItem(item): void {
    item.selected = typeof item.selected !== 'undefined' ? !item.selected : true;
    let allChecked = true;
    this.safetyIssues.items.map((item: any) => {
      if (!item.selected) allChecked = false;
    });
    this.allChecked = allChecked;
  }

}
