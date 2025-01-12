import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModel } from 'src/app/models/notification.model';
import { NavController } from '@ionic/angular';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationModels: NotificationModel[] = [];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getNotifications();
  }

  async back() {
    this.navCtrl.back();
  }

  async getNotifications() {
    const response: any = await this.notificationService.getNotifications();
    this.notificationModels = response.data;
  }

  redirectTo(url: string) {
    if (url) {
      this.router.navigateByUrl(url).catch((error) => {
        console.error('Navigation error:', error);
      });
    } else {
      console.warn('No URL specified for notification.');
    }
  }

  refreshData(event: any) {
    setTimeout(() => {
      this.getNotifications();
      this.notificationService.markAsRead();
      event.target.complete();
    }, 2000);
  }
}
