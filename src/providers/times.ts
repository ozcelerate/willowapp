import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TimesheetsModel } from '../classes/timesheet.model';

/*
  Generated class for the Times provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TimesService {

  workerTimes: TimesheetsModel = new TimesheetsModel();

  constructor(public http: Http) {
    console.log('Hello Times Provider');
  }

  getData(): Promise<TimesheetsModel> {
    console.log("getData timesheets")
    return this.http.get('./assets/example_data/times.json')
     .toPromise()
     .then(response => response.json() as TimesheetsModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  //
  // setWorkersStatus(workers: WorkersModel) {
  //   this.workersStatus.items = workers.items;
  // }

  getWorkersStatus() {
    return this.workerTimes;
  }

  }
