import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-notification',
    templateUrl: './notification.page.html',
    styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    async cancelCreate() {
        this.router.navigate(['/home/profile']);
      }
}