import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-house',
    templateUrl: './house.page.html',
    styleUrls: ['./house.page.scss'],
})
export class HousePage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    async cancelCreate() {
        this.router.navigate(['/home/profile']);
    }
}
