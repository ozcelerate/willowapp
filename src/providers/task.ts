import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

import { TasksModel } from '../classes/task.model';
/*
  Generated class for the Task provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskService {

  constructor(public http: Http) {
    console.log('Hello Task Provider');
  }

  getData(): Promise<TasksModel> {
    console.log("getData tasks")
    return this.http.get('./assets/example_data/task.json')
     .toPromise()
     .then(response => response.json() as TasksModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
