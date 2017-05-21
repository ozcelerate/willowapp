export class SwmModel {
  id: number
  name: string;
  image: string;
  description: string;
  inuse: boolean;
  red: boolean;
  yellow: boolean;
  green:boolean;
}
export class SwmsModel {
  items: Array<SwmModel>;
}
