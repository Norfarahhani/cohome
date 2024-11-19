import { ExpenseModel } from "./expense.model";

export class ExpenseMemberModel {
  constructor(
    public id: string = '',
    public expense_id: string = '',
    public member_id: string = '',
    public status: string = '',
    public members: number = 0,
    public expense: ExpenseModel = new ExpenseModel()
  ) { }
}
