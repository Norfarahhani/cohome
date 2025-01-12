export class TaskMemberModel {
  id?: number;
  task_id?: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;

  constructor(init?: Partial<TaskMemberModel>) {
    Object.assign(this, init);
  }
}
