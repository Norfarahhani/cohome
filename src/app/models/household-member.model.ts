import { UserModel } from "./user.model";

export class HouseholdMemberModel {
  constructor(
    public household_id: string = '',
    public member_id: string = '',
    public userDetails: UserModel = new UserModel()
  ) { }
}
