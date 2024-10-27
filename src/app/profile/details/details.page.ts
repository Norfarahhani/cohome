import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-profile-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    async cancelCreate() {
        this.router.navigate(['/home/profile']);
      }
   
}