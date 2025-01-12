export class UserModel {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  role?: string;
  age?: number;
  avatar_url?: string;
  qr_code_url?: string;
  phone_no?: string;
  fcm_token?: string;
  created_at?: string;
  updated_at?: string;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
