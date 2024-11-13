export class ExpenseMemberModel {
  constructor(
    public expense_id: string = '',
    public member_id: string = '',
    public status: string = '',
  ) { }
}
