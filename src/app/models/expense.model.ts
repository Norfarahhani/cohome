import { ExpenseMemberModel } from "./expense-member.model";

export class ExpenseModel {
  constructor(
    public id: string = '',
    public amount: number = 0,
    public date: string = '',
    public notes: string = '',
    public selected_category: string = '',
    public user_id: string = '',
    public members: string[] = []
  ) { }
}
