export class SafetyIssueModel {
  id: number
  name: string;
  image: string;
  description: string;
  date: string;
  issueChecked: boolean;
}
export class SafetyIssuesModel {
  items: Array<SafetyIssueModel>;
}
