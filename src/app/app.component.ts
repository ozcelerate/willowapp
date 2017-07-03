import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { FormsPage } from '../pages/forms/forms';
import { LayoutsPage } from '../pages/layouts/layouts';
import { TimesheetsPage } from '../pages/timesheets/timesheets';
import { WorkersPage } from '../pages/workers/workers'
//import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { Tudomundo } from '../providers/tudomundo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  //rootPage: any = WalkthroughPage;
  //rootPage: any = TabsNavigationPage;
  rootPage: any = LoginPage;

  pages: Array<{title: string, icon: string, component: any, supervisor?: boolean}>;
  pushPages: Array<{title: string, icon: string, component: any, supervisor?: boolean}>;

  lennylu: string;
  appGlobals: any;


  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    private tudomundoService: Tudomundo
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });

    this.pages = [
      { title: 'Home', icon: 'home', component: TabsNavigationPage },
      { title: 'Forms', icon: 'create', component: FormsPage }
    ];

    this.pushPages = [
      { title: 'Layouts', icon: 'grid', component: LayoutsPage },
      { title: 'Timesheets', icon: 'grid', component: TimesheetsPage, supervisor: true },
      { title: 'Workers', icon: 'people', component: WorkersPage, supervisor: true },
      { title: 'Settings', icon: 'settings', component: SettingsPage }
    ];

    this.lennylu = this.tudomundoService.getDebug();
    // this.lennylu = "lenny lu"
    this.appGlobals = this.tudomundoService.getLenny();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }

  showPage(p) {
    // console.log("page is " + p.title);
    if (p.hasOwnProperty('supervisor')) {
      // the page supervisor property may be set to false
      if (p.supervisor) return this.appGlobals.supervisor;
    }
    // if page has no supervisor property or the page has supervisor prop false
    // then anyone can see it.
    return true;
  }
}
