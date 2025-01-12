import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HouseholdService } from 'src/app/household/household.service';
import { ToastService } from 'src/app/service/toast.service';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-profile-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage {
  code: string = '';

  constructor(
    private router: Router,
    private householdService: HouseholdService,
    private toastService: ToastService,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }

  async cancelCreate() {
    this.router.navigate(['/home/profile']);
  }

  async joinHousehold() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response = await this.householdService.joinHousehold(this.code);
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
}
