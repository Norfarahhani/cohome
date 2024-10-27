import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-task-day',
    templateUrl: './day.page.html',
    styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    async createTask() {
        this.router.navigate(['/task/create']);
    }

    async cancelTask() {
        this.router.navigate(['/home/task']);
    }
}