export class WorkerModel {
  id: number
  name: string;
  image: string;
  description: string;
  swms: number[]; //swms for the days
  validSwms: number[]; // passed certification
  swmCompliant: boolean; // has this worker finished all the swm courses
  tasks: number[]; // tasks allocated for today / this prestart??
  clockOn: string;
  clockOff: string;
  startedWork: boolean;
  finishedWork: boolean;
  date: Date;
  ackSwms: boolean;
  ackSafetyFocus: boolean;
  ackIssues: boolean;
  

}

export class WorkersModel {
  items: Array<WorkerModel>;
}
