import { ExpenseModel } from "./expense.model";
import { UserModel } from "./user.model";

export class ExpenseMemberModel {
  id?: number;
  expense_id?: number;
  user_id?: number;
  is_paid?: number;
  receipt?: string;
  receipt_url?: string;
  expense?: ExpenseModel;
  created_at?: string;
  updated_at?: string;
  user?: UserModel;

  constructor(init?: Partial<ExpenseMemberModel>) {
    Object.assign(this, init);
  }
}
