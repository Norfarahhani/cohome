import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  hasHousehold: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getLocalStorage();
    this.subscription = this.authService.refreshLocalStorage$.subscribe(() => {
      this.getLocalStorage();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLocalStorage() {
    this.hasHousehold = localStorage.getItem('has_household') === 'true';
  }

}
