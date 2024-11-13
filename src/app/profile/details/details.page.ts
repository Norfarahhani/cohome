import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  name: string = '';
  age: number = 0;
  email: string = '';
  phone: string = '';

  constructor(private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  async cancelCreate() {
    this.router.navigate(['/home/profile']);
  }

  getUserDetails() {
    this.profileService.getUserDetails().subscribe({
      next: (data: any) => {
        if (data) {
          this.name = data.name;
          this.age = data.age;
          this.phone = data.phone;
          this.email = data.email;
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  async updateUserDetails() {
    const user: any = {
      name: this.name,
      age: this.age,
      phone: this.phone
    };

    await this.profileService.updateUserDetails(user);

    this.router.navigate(['/home/profile']);
  }

}
