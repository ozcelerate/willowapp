export class SafetyFocusModel {
  id: number
  name: string;
  image: string;
  description: string;
  details: string;
  date: string;
  actions: string;
  selected?: boolean;
}
export class SafetyFocusesModel {
  items: Array<SafetyFocusModel>;
}
