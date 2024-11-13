import { Component, OnInit, } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  name: string = '';
  email: string = '';
  hasHousehold: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserDetails();
    this.householdCheck();
  }

  getUserDetails() {
    this.profileService.getUserDetails().subscribe({
      next: (data: any) => {
        if (data) {
          this.name = data.name;
          this.email = data.email;
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  async householdCheck() {
    const check = localStorage.getItem('hasHousehold');
    this.hasHousehold = (check == 'true') ? true : false;
  }

}
