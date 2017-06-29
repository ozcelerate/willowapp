import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
//import { counterRangeValidator } from '../../components/counter-input/counter-input';
import { SwmDetailPage } from '../swm-detail/swm-detail';
import { SwmListEditPage } from '../swm-list-edit/swm-list-edit';

import { SwmsModel } from '../../classes/swm.model';
import { SwmService } from '../../providers/swm';

import { TasksModel } from '../../classes/task.model';
import { TaskService } from '../../providers/task';

import { SafetyFocusesModel } from '../../classes/safety-focus.model';
import { SafetyFocusService } from '../../providers/safety-focus';
import { SafetyIssuesModel } from '../../classes/safety-issue.model';
import { SafetyIssueService } from '../../providers/safety-issue';
import { Tudomundo } from '../../providers/tudomundo';

// import { List2Model } from '../list-2/list-2.model';
// import { List2Service } from '../list-2/list-2.service';
import 'rxjs/Rx';

@Component({
  selector: 'prestart-page',
  templateUrl: 'prestart.html'
})
export class PrestartPage {
  section: string;

  post_form: any;
  event_form: FormGroup;
  card_form: FormGroup;
  //list2: List2Model = new List2Model();
  swmlist: SwmsModel = new SwmsModel();
  activeSWMs: SwmsModel = new SwmsModel(); // these are determined from the tasks
  tasklist: TasksModel = new TasksModel();
  requiredSWMids: number[] = [];
  loading: any;

  safetyFocuses: SafetyFocusesModel = new SafetyFocusesModel();
  safetyIssues: SafetyIssuesModel = new SafetyIssuesModel();

  categories_checkbox_open: boolean;
  categories_checkbox_result;
  checkboxTagsForm: FormGroup;

  constructor(public nav: NavController,
              public alertCtrl: AlertController,
              public swmService: SwmService,
              public taskService: TaskService,
              public safetyFocusService: SafetyFocusService,
              public safetyIssueService: SafetyIssueService,
              public loadingCtrl: LoadingController,
              private tudomundoService: Tudomundo) {
    this.section = "task";
    this.loading = this.loadingCtrl.create();

    this.post_form = new FormGroup({
      //title: new FormControl('', Validators.required),
      //description: new FormControl('', Validators.required),
      //servings: new FormControl(2, counterRangeValidator(10, 1)),
      //time: new FormControl('01:30', Validators.required),
      //temperature: new FormControl(180),

        // tag_1: new FormControl(false),
        // tag_2: new FormControl(false),
        // tag_3: new FormControl(true),
        // tag_4: new FormControl(true),
        // tag_5: new FormControl(false),
        // tag_6: new FormControl(false),
        // tag_7: new FormControl(true),
        // tag_8: new FormControl(false)

    });
    this.event_form = new FormGroup({
      title: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      from_date: new FormControl('2016-09-18', Validators.required),
      from_time: new FormControl('13:00', Validators.required),
      to_date: new FormControl('', Validators.required),
      to_time: new FormControl('', Validators.required)
    });
    this.card_form = new FormGroup({
      card_number: new FormControl('', Validators.required),
      card_holder: new FormControl('', Validators.required),
      cvc: new FormControl('', Validators.required),
      exp_date: new FormControl('', Validators.required),
      save_card: new FormControl(true, Validators.required)
    });

    // this.checkboxTagsForm = new FormGroup({
    //   tag_1: new FormControl(false),
    //   tag_2: new FormControl(false),
    //   tag_3: new FormControl(true),
    //   tag_4: new FormControl(true),
    //   tag_5: new FormControl(false),
    //   tag_6: new FormControl(false),
    //   tag_7: new FormControl(true),
    //   tag_8: new FormControl(false)
    // });
  }

  ionViewDidLoad() {

    console.log("ionViewDidLoad prestart")
    this.loading.present();
    this.swmService
      .getData()
      .then(data => {
        console.log("got swms data in prestart")
        this.swmlist.items = data.items;
        this.loading.dismiss();
      });

    this.taskService
      .getData()
      .then(data => {
        console.log("got tasks data in prestart")
        this.tasklist.items = data.items;
        //this.loading.dismiss();
      });

    this.safetyFocusService
      .getData()
      .then((sfd) => {
        console.log("got the safter focus data");
        this.safetyFocuses.items = sfd.items;
        console.log(this.safetyFocuses);
      });

    this.safetyIssueService.getData().then((issues) => {
      console.log("got the safter issue data");
      this.safetyIssues.items = issues.items
    });

    console.log("lenny debug is " + this.tudomundoService.getDebug())


  }

  ionViewWillEnter() {

    console.log ("entering prestart page .... recalc the active swms");
    this.generateActiveSwms()
  }


  onSegmentChanged(segmentButton: SegmentButton) {
    console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    console.log('Segment selected', segmentButton.value);
  }

  createPost1(){
    console.log("create post")
    console.log(this.post_form.value);
    //onsole.log(this.checkboxTagsForm.value);
  }

  // Generate the active swms from the active tasks
  // Save the updated swm list to the swmService for use elsewhere
  generateSwms(){
    console.log("generate swms");
    // clear the list first-child
    this.requiredSWMids = [];
    // build an array of all the swm ids required
    this.tasklist.items.forEach((task) => {
      // only if the task is active
      if (task.selected) {
        task.swms.forEach((id) => {
          console.log("swm id " + id)
          if (this.requiredSWMids.indexOf(id) < 0) {
            this.requiredSWMids.push(id)
          }
        })
      }
    })
    console.log(this.requiredSWMids);
    // save requiredSWMids to swmService to use later to cross reference
    // against each worker to make sure they have done the swm courses
    // required for the day's tasks
    this.swmService.setRequiredSwms(this.requiredSWMids);

    // generate a local list of just the active swms to display
    this.activeSWMs.items = this.swmlist.items.filter((swm) => {
      console.log("swm " + swm.name + " is " + swm.inuse)
      swm.inuse = false;
      // now see if swm id in the active lists
      if (this.requiredSWMids.indexOf(swm.id) >= 0) {
        swm.inuse = true;
      }
      return swm.inuse;
    })
    // update the service
    this.swmService.updateSwmList(this.swmlist);
    // got next segment / tab for swms
    this.section = "swm";

    // just some debug for testing
    // change the tudomundo service data
    this.tudomundoService.setLenny(true, "fireguys", "elory me boy")
  }

  generateActiveSwms() {
    // just generate a list of active swms
    this.activeSWMs.items = this.swmlist.items.filter((swm) => {
      return swm.inuse;
    })
  }

  createEvent(){
    console.log(this.event_form.value);
  }

  createCard(){
    console.log(this.card_form.value);
  }

  chooseCategory(){
    console.log("chooseCategory")
    let alert = this.alertCtrl.create({
      cssClass: 'category-prompt'
    });
    alert.setTitle('Site');

    alert.addInput({
      type: 'radio',
      label: 'Logan',
      value: 'logan',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Gateway Sth',
      value: 'gatewaySouth'
    });
    alert.addInput({
      type: 'radio',
      label: 'Gateway Nth',
      value: 'gatewayNorth'
    });
    alert.addInput({
      type: 'radio',
      label: 'Lismore',
      value: 'lismore'
    });
    alert.addInput({
      type: 'radio',
      label: 'New Zealand',
      value: 'newZealand'
    });
    alert.addInput({
      type: 'radio',
      label: 'Cabolture',
      value: 'cabolture'
    });
    alert.addInput({
      type: 'radio',
      label: 'Barbados',
      value: 'barbados'
    });
    alert.addInput({
      type: 'radio',
      label: 'Cuba',
      value: 'cuba'
    });
    alert.addInput({
      type: 'radio',
      label: 'Panama',
      value: 'panama'
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'Confirm',
      handler: data => {
        console.log('Checkbox data:', data);
        this.categories_checkbox_open = false;
        this.categories_checkbox_result = data;
      }
    });
    alert.present().then(() => {
      this.categories_checkbox_open = true;
    });
  }

  swmdetails(swmid, swm) {
    console.log("goto swm details for " + swmid);
    this.nav.push(SwmDetailPage, {id: swmid, swm: swm});
  }

  editActiveSwms() {
    console.log("edit swm list");
    this.nav.push(SwmListEditPage);
  }

  prestartsComplete() {
    console.log("prestart complete goto sign in")
    this.nav.parent.select(1);

  }

}
