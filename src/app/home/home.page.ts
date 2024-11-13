import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasHousehold: boolean = false;

  constructor() { }

  ngOnInit() {
    this.householdCheck();
  }

  householdCheck() {
    const check = localStorage.getItem('hasHousehold');
    this.hasHousehold = (check == 'true') ? true : false;
  }

}
