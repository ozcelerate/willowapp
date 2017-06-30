import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TimesheetsModel } from '../../classes/timesheet.model';
import { TimesService } from '../../providers/times';
import * as moment from 'moment';
/**
 * Generated class for the TimesheetHistory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-timesheet-history',
  templateUrl: 'timesheet-history.html',
})
export class TimesheetHistoryPage {
  worker: string;
  timesheets: TimesheetsModel = new TimesheetsModel();
  workerTimes: any[] = [1,2,3,4,5];
  dvt: any[];
  noTimesYet: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private timesService: TimesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesheetHistory');

    this.timesService
      .getData()
      .then(data => {
        console.log("got timesheet data in verify times")
        this.timesheets.times = data.times;
      });
  }

  getTimes() {
    // get all the times for the selected worker within the dates selected
    // NB: for the demo just get all the days irrespective of the date range
    console.log("map times")
    this.workerTimes = this.timesheets.times.map((t) => {
      // select only times for the selected worker
      console.log(t)
      console.log("type of workers is " + typeof t.workers)
      // let x = t.workers.filter((w) => true)
      let wt = t.workers.filter((w) => {
        console.log("Does " + w.worker + " = " + this.worker)
        return !w.worker.localeCompare(this.worker);
      });
      console.log("lets see the filtered workers")
      console.log(wt)

      // create the structure to return
      wt[0].date = t.dateString;
      return wt[0];
    }).map((wt) => {
      this.timeChange(wt)
      return wt
    })

    console.log(this.workerTimes)
    this.noTimesYet = false;


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

  // debug just for fun
  chooseDayType(wd) {
    alert (wd.dayString + "! - Get back to work, you bludger")
  }

}
