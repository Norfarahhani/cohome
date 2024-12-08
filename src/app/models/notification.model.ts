export class NotificationModel {
  constructor(
    public body: string = '',
    public created_at: string = '',
    public from: string = '',
    public title: string = '',
    public to: string = '',
    public url: string = '',
    public fromName: string = ''
  ) { }
}
