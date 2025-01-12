export class HouseholdMemberModel {
  id?: number;
  household_id?: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;

  constructor(init?: Partial<HouseholdMemberModel>) {
    Object.assign(this, init);
  }
}
