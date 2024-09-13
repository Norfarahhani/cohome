import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircleOutline, barChartOutline, folderOpenOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private router: Router) {
    addIcons({ homeOutline,folderOpenOutline, barChartOutline, personCircleOutline });
  }

  navigateToHousehold() {
    // Navigate to the Household tab
    this.router.navigateByUrl('/household/index');
  }

  navigateToProfile() {
    // Navigate to the Profile tab
    this.router.navigateByUrl('/profile/details');
  }
}