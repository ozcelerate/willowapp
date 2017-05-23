import { Component } from '@angular/core';

//import { ListingPage } from '../listing/listing';
//import { ProfilePage } from '../profile/profile';
//import { NotificationsPage } from '../notifications/notifications';
import { PrestartPage } from '../prestart/prestart';
import { ClockOnPage } from '../clock-on/clock-on';
import { ClockOffPage } from '../clock-off/clock-off';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    //this.tab1Root = ListingPage;
    this.tab1Root = PrestartPage;
    //this.tab2Root = ProfilePage;
    this.tab2Root = ClockOnPage;
    this.tab3Root = ClockOffPage;
  }
}
