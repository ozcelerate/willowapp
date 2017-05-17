import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { SwmsModel } from '../classes/swm.model';


//import 'rxjs/add/operator/map';

/*
  Generated class for the Swm provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SwmService {

  // global instance of the swms status - ie active / editied / generated
  swmlist: SwmsModel = new SwmsModel();
  requiredSwms: number[];

  constructor(public http: Http) {
    console.log('Hello Swm Provider');
  }

  // this gets the data from the server - just the swm definitions .. .therefore
  // are no live status in this data.
  getData(): Promise<SwmsModel> {
    console.log("getData swms")
    return this.http.get('./assets/example_data/swm.json')
     .toPromise()
     .then(response => response.json() as SwmsModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  updateSwmList(swmlist) {
    console.log("updated swmlist in service")
    this.swmlist = swmlist;
    console.log(this.swmlist.items)
  }

  getSwmList() {
    console.log("get swm list from service")
    return this.swmlist;
  }

  setRequiredSwms(requiredSwms) {
    this.requiredSwms = requiredSwms;
    console.log("set required swms in swmService")
    console.log(this.requiredSwms)
  }

  getRequiredSwms() {
    return this.requiredSwms;
  }
}
