export class WorkDayModel {
  worker: string;
  location?: string;
  type: string;
  lunch?: boolean;
  start?: string;
  finish?: string;
  hoursWorked?: string;
  verified?: boolean;
  date?: string;
}

export class TimesheetModel {
  id?: number;
  dateString: string;
  workdate?: any;
  allSelected?: boolean;
  workers: WorkDayModel[];
}

export class TimesheetsModel {
  times: Array<TimesheetModel>;
}
