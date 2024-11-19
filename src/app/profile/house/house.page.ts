import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HouseholdService } from 'src/app/household/household.service';
import { HouseholdModel } from 'src/app/models/household.model';

@Component({
  selector: 'app-profile-house',
  templateUrl: './house.page.html',
  styleUrls: ['./house.page.scss'],
})
export class HousePage implements OnInit {
  householdModel: HouseholdModel = new HouseholdModel();

  constructor(private router: Router, private householdService: HouseholdService) { }

  ngOnInit() {
    this.getHousehold();
  }

  cancelCreate() {
    this.router.navigate(['/home/profile']);
  }

  async getHousehold() {
    this.householdModel = await this.householdService.getHousehold();
  }
}
