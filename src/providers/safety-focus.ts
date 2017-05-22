import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { SafetyFocusesModel } from '../classes/safety-focus.model';


@Injectable()
export class SafetyFocusService {
  safetyFocuslist: SafetyFocusesModel = new SafetyFocusesModel();

  constructor(public http: Http) {
    console.log('Hello Safety Focus Provider');
  }

  // this gets the data from the server - just the swm definitions .. .therefore
  // are no live status in this data.
  getData(): Promise<SafetyFocusesModel> {
    console.log("getData safety focus data")
    return this.http.get('./assets/example_data/safety-focus.json')
     .toPromise()
     .then(response => response.json() as SafetyFocusesModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // getSafetyFocusList() {
  //   console.log("get safety focus list from service")
  //   return this.safetyFocuslist;
  // }
}
