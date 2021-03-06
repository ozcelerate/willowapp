import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TimesheetVerifyPage } from '../timesheet-verify/timesheet-verify';
import { TimesheetHistoryPage } from '../timesheet-history/timesheet-history';

@Component({
  selector: 'timesheet-page',
  templateUrl: 'timesheets.html'
})
export class TimesheetsPage {
  items: Array<{title: string, note?: string, component: any}>;

  constructor(public nav: NavController) {
    this.items = [
      { title: 'Verify', component: TimesheetVerifyPage },
      { title: 'History', component: TimesheetHistoryPage },
      // { title: 'My Timesheets', component: myTimesheetPage }
    ];
  }

  itemTapped(event, item) {
    this.nav.push(item.component);
  }
}
