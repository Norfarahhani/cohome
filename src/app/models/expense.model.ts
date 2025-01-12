import { ExpenseMemberModel } from "./expense-member.model";

export class ExpenseModel {
  id?: number;
  amount?: number;
  expense_date?: string;
  notes?: string;
  selected_category?: string;
  user_id?: number;
  members?: string[];
  expense_members?: ExpenseMemberModel[];
  is_paid?: boolean;
  created_at?: string;
  updated_at?: string;

  constructor(init?: Partial<ExpenseModel>) {
    Object.assign(this, init);
  }
}
