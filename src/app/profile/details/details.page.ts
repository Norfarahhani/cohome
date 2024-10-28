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

    async getUserDetails() {
        const data: any = await this.profileService.getUserDetails();
        this.name = data.name;
        this.age = data.age;
        this.phone = data.phone;
        this.email = data.email;
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