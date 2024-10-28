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

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  async getUserDetails() {
    const data: any = await this.profileService.getUserDetails();
    this.name = data.name;
    this.email = data.email;
  }
}
