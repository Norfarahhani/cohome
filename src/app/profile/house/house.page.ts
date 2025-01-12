import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { HouseholdService } from 'src/app/household/household.service';
import { HouseholdModel } from 'src/app/models/household.model';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-profile-house',
  templateUrl: './house.page.html',
  styleUrls: ['./house.page.scss'],
})
export class HousePage implements OnInit {
  householdData: HouseholdModel = new HouseholdModel();
  isLeader: boolean = false;

  constructor(
    private householdService: HouseholdService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getHousehold();
    this.isLeader = localStorage.getItem('is_leader') === 'true';
  }

  async back() {
    this.navCtrl.back();
  }

  async save() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.householdService.updateHousehold(this.householdData);
    await loading.dismiss();
    if (response.success) {
      this.toastService.showSuccess(response.message);
    } else {
      this.toastService.showError(response.message);
    }
  }

  async getHousehold() {
    const response: any = await this.householdService.getHouseholdDetails();
    if (response.success) {
      this.householdData = response.data;
    }
  }
}
