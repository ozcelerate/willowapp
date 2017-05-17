export class TaskModel {
  id: number
  name: string;
  image: string;
  description: string;
  swms: number[];
  selected: boolean;
}
export class TasksModel {
  items: Array<TaskModel>;
}
