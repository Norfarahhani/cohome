import { Timestamp } from "@angular/fire/firestore";

export class TaskModel {
  constructor(
    public household_id: string = '',
    public days: string[] = [],
    public members: string[] = [],
    public notes: string = '',
    public reminder: string = '',
    public tasks: number = 0
  ) { }
}
