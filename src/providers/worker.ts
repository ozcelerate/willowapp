import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { WorkersModel } from '../classes/worker.model';
/*
  Generated class for the Worker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkerService {

  constructor(public http: Http) {
    console.log('Hello Worker Provider');
  }

  getData(): Promise<WorkersModel> {
    // just mock data for now but not clear how the list of workers will be
    // generated on the server (ie prepopulated by head office, filtered on
  // supervisior etc)
    console.log("getData workers")
    return this.http.get('./assets/example_data/workers.json')
     .toPromise()
     .then(response => response.json() as WorkersModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
