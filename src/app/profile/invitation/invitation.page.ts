import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { HouseholdService } from 'src/app/household/household.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-profile-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {
  householdId: string = '';
  householdDetails: any;
  hasHousehold: boolean = false;
  constructor(
    private router: Router,
    private householdService: HouseholdService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.householdId = this.route.snapshot.params['id'];
    this.getHouseholdDetails();
    this.getLocalStorage();
  }

  async getHouseholdDetails() {
    const response: any = await this.householdService.getHouseholdDetails(this.householdId);
    this.householdDetails = response.data;
  }

  async back() {
    this.navCtrl.back();
  }

  async joinHousehold() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.householdService.joinHousehold(this.householdDetails.code);
    await loading.dismiss();
    if (response.success) {
      this.router.navigate(['/home/household']).then(() => {
        this.toastService.showSuccess(response.message);
        this.householdService.triggerRefreshHousehold();
        this.authService.triggerRefreshLocalStorage();
      });
    } else {
      this.toastService.showError(response.message);
    }
  }

  getLocalStorage() {
    this.hasHousehold = localStorage.getItem('has_household') === 'true';
  }
}

