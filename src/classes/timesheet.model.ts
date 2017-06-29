export class WorkDayModel {
  worker: string;
  location?: string;
  type: string;
  lunch?: boolean;
  start?: string;
  finish?: string;
  hoursWorked?: string;
}

export class TimesheetModel {
  id?: number;
  dateString: string;
  workers: WorkDayModel[];
}

export class TimesheetsModel {
  times: Array<TimesheetModel>;
}
