export class TaskModel {
  id?: number;
  household_id?: number;
  days?: string[];
  notes?: string;
  task_id?: number;
  members?: string[];
  created_at?: string;
  updated_at?: string;

  constructor(init?: Partial<TaskModel>) {
    Object.assign(this, init);
  }
}
