import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-expense-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    async cancelCreate() {
        this.router.navigate(['/home/expense']);
      }

}