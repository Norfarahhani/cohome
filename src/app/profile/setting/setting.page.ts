import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastService: ToastService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  async back() {
    this.navCtrl.back();
  }

  async save() {
    if (this.newPassword !== this.confirmPassword) {
      this.toastService.showError('New password and confirm password do not match.');
      return;
    }

    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.authService.changePassword(this.currentPassword, this.newPassword);
    await loading.dismiss();
    if (response.success) {
      this.toastService.showSuccess(response.message);
    } else {
      this.toastService.showError(response.message);
    }
  }

  async logout() {
    const response: any = await this.authService.logoutUser();
    if (response.success) {
      this.toastService.showSuccess(response.message);
      this.router.navigate(['/auth/login']).then(() => {
        window.location.reload();
      });
    } else {
      this.toastService.showError(response.message);
    }
  }
}
