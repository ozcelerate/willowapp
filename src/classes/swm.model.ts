export class SwmModel {
  id: number
  name: string;
  image: string;
  description: string;
  inuse: boolean;
}
export class SwmsModel {
  items: Array<SwmModel>;
}
