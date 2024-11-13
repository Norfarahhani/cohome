import { ExpenseMemberModel } from "./expense-member.model";

export class ExpenseModel {
  constructor(
    public amount: string = '',
    public date: string = '',
    public notes: string = '',
    public selected_category: string = '',
    public members: string[] = []
  ) { }
}
