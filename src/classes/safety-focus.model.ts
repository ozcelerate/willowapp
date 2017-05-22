export class SafetyFocusModel {
  id: number
  name: string;
  image: string;
  description: string;
  details: string;
  date: string;
  actions: string;
}
export class SafetyFocusesModel {
  items: Array<SafetyFocusModel>;
}
