export class HouseholdModel {
  id?: number;
  code?: string;
  household_address?: string;
  household_name?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;

  constructor(init?: Partial<HouseholdModel>) {
    Object.assign(this, init);
  }
}
