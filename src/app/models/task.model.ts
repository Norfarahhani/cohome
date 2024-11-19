export class TaskModel {
  constructor(
    public household_id: string = '',
    public days: string[] = [],
    public members: string[] = [],
    public notes: string = '',
    public reminder: boolean = false,
    public selectedRepeatOption: string = '',
    public tasks: number = 0
  ) { }
}
