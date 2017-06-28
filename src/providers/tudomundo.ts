import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Tudomundo provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Tudomundo {
  supervisorRole = false;
  evtDebug = "naughty";
  dvtGlobals = {
    supervisor: false,
    role: "worker" ,
    lvtDebug: "lenny1"}

  constructor(public http: Http) {
    console.log('Hello Tudomundo Provider');
  }

  setUserRole(isSupervisor) {
    this.supervisorRole = isSupervisor;
  }

  getDebug() {
    return this.evtDebug;
  }

  getLenny() {
    return this.dvtGlobals;
  }

  setLenny(isSuper, role, dbgStr) {
    this.dvtGlobals.role = role;
    this.dvtGlobals.supervisor = isSuper;
    this.dvtGlobals.lvtDebug = dbgStr;
    this.evtDebug = "goodboy now"
  }
}
