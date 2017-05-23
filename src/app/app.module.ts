import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListingPage } from '../pages/listing/listing';
import { FeedPage } from '../pages/feed/feed';
import { FollowersPage } from '../pages/followers/followers';
import { LayoutsPage } from '../pages/layouts/layouts';
import { FormsPage } from '../pages/forms/forms';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SchedulePage } from '../pages/schedule/schedule';
import { List1Page } from '../pages/list-1/list-1';
import { List2Page } from '../pages/list-2/list-2';
import { GridPage } from '../pages/grid/grid';
import { FormLayoutPage } from '../pages/form-layout/form-layout';
import { PrestartPage } from '../pages/prestart/prestart';
import { FiltersPage } from '../pages/filters/filters';
import { SwmDetailPage } from '../pages/swm-detail/swm-detail';
import { SwmListEditPage } from '../pages/swm-list-edit/swm-list-edit';
import { ClockOnPage } from '../pages/clock-on/clock-on';
import { ClockOffPage } from '../pages/clock-off/clock-off';
import { SwmPage } from '../pages/swm/swm';
import { SafetyFocusPage } from '../pages/safety-focus/safety-focus';
import { SafetyFocusDetailPage } from '../pages/safety-focus-detail/safety-focus-detail';
import { SafetyIssuesPage } from '../pages/safety-issues/safety-issues';

import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';

import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';

import { FeedService } from '../pages/feed/feed.service';
import { ListingService } from '../pages/listing/listing.service';
import { ProfileService } from '../pages/profile/profile.service';
import { NotificationsService } from '../pages/notifications/notifications.service';
import { List1Service } from '../pages/list-1/list-1.service';
import { List2Service } from '../pages/list-2/list-2.service';
import { ScheduleService } from '../pages/schedule/schedule.service';
import { SwmService } from '../providers/swm';
import { TaskService } from '../providers/task';
import { WorkerService } from '../providers/worker';
import { SafetyFocusService } from '../providers/safety-focus';
import { SafetyIssueService } from '../providers/safety-issue';

@NgModule({
  declarations: [
    MyApp,
    ListingPage,
    FeedPage,
    FollowersPage,
    LayoutsPage,
    FormsPage,
    LoginPage,
    NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    SignupPage,
    ForgotPasswordPage,
    SchedulePage,
    List1Page,
    List2Page,
    GridPage,
    FormLayoutPage,
    FiltersPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    PrestartPage,
    SwmDetailPage,
    SwmListEditPage,
    ClockOnPage,
    ClockOffPage,
    SwmPage,
    SafetyFocusPage,
    SafetyFocusDetailPage,
    SafetyIssuesPage,

    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListingPage,
    FeedPage,
    FollowersPage,
    LayoutsPage,
    FormsPage,
    LoginPage,
    NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    ForgotPasswordPage,
    SignupPage,
    SchedulePage,
    List1Page,
    List2Page,
    GridPage,
    FormLayoutPage,
    FiltersPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    PrestartPage,
    SwmDetailPage,
    SwmListEditPage,
    ClockOnPage,
    ClockOffPage,
    SwmPage,
    SafetyFocusPage,
    SafetyFocusDetailPage,
    SafetyIssuesPage
  ],
  providers: [FeedService, ListingService, ProfileService, NotificationsService,
              List1Service, List2Service, ScheduleService, SwmService,
              TaskService, WorkerService, SafetyFocusService,
              SafetyIssueService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
