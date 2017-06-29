import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { TimesheetsModel } from '../../classes/timesheet.model';
import { TimesService } from '../../providers/times';
import * as moment from 'moment';

/**
 * Generated class for the TimesheetVerify page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-timesheet-verify',
  templateUrl: 'timesheet-verify.html',
})
export class TimesheetVerifyPage {
  loading: any;
  timesheets: TimesheetsModel = new TimesheetsModel();
  days: number = 0;
  selectedDay: number = 0;
  theDay: "today";
  today: any = {dateString: "empty", workers: []};
  allSelected = false;

  // controls for AlertController
  categories_checkbox_open: boolean;
  categories_checkbox_result;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private timesService: TimesService,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
      this.loading = this.loadingCtrl.create();
      // this.timesheets.times = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesheetVerify');
    let today = moment();
    console.log("today is " + today.format("dddd, MMMM Do YYYY, h:mm:ss a"))
    this.loading.present();
    this.timesService
      .getData()
      .then(data => {
        console.log("got timesheet data in verify times")
        this.timesheets.times = data.times;
        // parse the data to get it in shape ... some of this is just
        // for debug like creating dates editActiveSwms
        for(let i=0, tot=this.timesheets.times.length; i<tot; i++) {
          this.timesheets.times[i].workdate = today.subtract(i, 'days');
          this.timesheets.times[i].dateString = this.timesheets.times[i].workdate
            .calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'DD/MM/YYYY'
            });
          console.log("dates are " + this.timesheets.times[i].dateString)
          this.timesheets.times[i].allSelected = false;

          // calculate all the hours
          for(let j=0, wtot=this.timesheets.times[i].workers.length; j<wtot; j++) {
            this.timeChange(this.timesheets.times[i].workers[j]);
          }
        }

        this.loading.dismiss();
        this.days = this.timesheets.times.length;
        this.today = this.timesheets.times[0];
        this.theDay = this.today.dateString;
        console.log("today's times are")
        console.log(this.today)
      });
  }

  selectAll() {
    console.log("supervisor verified all times");
    for (let i=0, tot=this.today.workers.length; i<tot; i++) {
      this.today.workers[i].verified = this.allSelected;
    }
  }

  dayBack() {
    console.log("go back a day");
    if (this.selectedDay < this.days-1) {
      // first save all selected flag
      this.today.allSelected = this.allSelected;
      this.selectedDay += 1;
      this.today = this.timesheets.times[this.selectedDay];
      this.theDay = this.today.dateString;
      this.allSelected = this.today.allSelected;

    }
  }

  dayForward() {
    console.log("go forward a day");
    if (this.selectedDay > 0) {
      // first save all selected flag
      this.today.allSelected = this.allSelected;
      this.selectedDay -= 1;
      this.today = this.timesheets.times[this.selectedDay];
      this.theDay = this.today.dateString;
      this.allSelected = this.today.allSelected;
    }
  }

  timeChange(w) {
    console.log("change the times - " + w.start);
    let startTime=moment(w.start, "HH:mm");
    let endTime=moment(w.finish, "HH:mm");
    let duration = moment.duration(endTime.diff(startTime));
    // let hours = parseInt(duration.asHours());
    let hours = duration.days()*24+ duration.hours();
    if (w.lunch) {
      hours -= 1;
    }
    let min = duration.minutes();
    let timeDifference = hours +":"+ min;
    console.log("time diff is " + timeDifference);
    w.hoursWorked = timeDifference;
  }

  chooseDayType(w) {
    console.log("choose the type of working day")
    console.log(w);
    let alert = this.alertCtrl.create({
      cssClass: 'category-prompt'
    });
    alert.setTitle('Choose Day Type');

    alert.addInput({
      type: 'radio',
      label: 'Work',
      value: "work",
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Annual Leave',
      value: 'annual'
    });
    alert.addInput({
      type: 'radio',
      label: 'Sick Leave',
      value: 'sick'
    });
    alert.addInput({
      type: 'radio',
      label: 'RDO',
      value: 'rdo'
    });
    alert.addInput({
      type: 'radio',
      label: 'Other',
      value: 'other'
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'Confirm',
      handler: data => {
        console.log('Checkbox data:', data);
        this.categories_checkbox_open = false;
        // convert to day type
        switch(data) {
          case "work": {
            console.log("work day");
            w.dayCode = 1;
            w.dayString = "Work";
            break;
          }
          case "annual": {
            console.log("work day");
            w.dayCode = 2;
            w.dayString = "Annual Leave";
            break;
          }
          case "sick": {
            console.log("sick day");
            w.dayCode = 3;
            w.dayString = "Sick Leave";
            break;
          }
          case "rdo": {
            console.log("RDO");
            w.dayCode = 4;
            w.dayString = "RDO";
            break;
          }
          case "other": {
            console.log("other");
            w.dayCode = 5;
            w.dayString = "Other";
            break;
          }
        }
      }
    });
    alert.present().then(() => {
      this.categories_checkbox_open = true;
    });
  }

  submit() {
    console.log("yet to be implemented")
    alert("not implemented")
  }

}
