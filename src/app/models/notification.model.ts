export class NotificationModel {
  data?: {
    title?: string;
    message?: string;
    url?: string;
    avatar?: string;
  };
  created_at?: string;
  read_at?: string;

  constructor(init?: Partial<NotificationModel>) {
    Object.assign(this, init);
  }
}
