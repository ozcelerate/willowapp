import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { SafetyIssuesModel } from '../classes/safety-issue.model';


@Injectable()
export class SafetyIssueService {
  safetyFocuslist: SafetyIssuesModel = new SafetyIssuesModel();

  constructor(public http: Http) {
    console.log('Hello Safety Focus Provider');
  }

  // this gets the data from the server - just the swm definitions .. .therefore
  // are no live status in this data.
  getData(): Promise<SafetyIssuesModel> {
    console.log("getData safety focus data")
    return this.http.get('./assets/example_data/safety-issue.json')
     .toPromise()
     .then(response => response.json() as SafetyIssuesModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
