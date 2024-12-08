import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { NotificationModel } from 'src/app/models/notification.model';

@Component({
  selector: 'app-profile-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationModels: NotificationModel[] = [];

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getNotifications();
  }

  async cancelCreate() {
    this.router.navigate(['/home/profile']);
  }

  getNotifications() {
    this.profileService.getNotificationsForUser().subscribe({
      next: (notifications) => {
        this.notificationModels = notifications;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      },
    });
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
}
