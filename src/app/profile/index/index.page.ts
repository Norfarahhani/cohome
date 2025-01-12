import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit, OnDestroy {
  userData: any;
  hasHousehold: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserDetails();
    this.getLocalStorage();
    this.subscription = this.profileService.refreshProfile$.subscribe(() => {
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getLocalStorage() {
    this.hasHousehold = localStorage.getItem('has_household') === 'true';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
