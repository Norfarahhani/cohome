import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserModel } from 'src/app/models/user.model';
import { ToastService } from 'src/app/service/toast.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user: UserModel = new UserModel();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) { }

  async register() {
    if (!this.user.name || !this.user.age || !this.user.phone_no || !this.user.email || !this.user.password || !this.user.confirm_password) {
      this.toastService.showError('All fields are required!');
      return;
    }

    if (this.user.password !== this.user.confirm_password) {
      this.toastService.showError('Passwords do not match!');
      return;
    }

    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.authService.registerUser(this.user);
    await loading.dismiss();
    if (response.success) {
      this.router.navigate(['/home']).then(() => {
        this.toastService.showSuccess(response.message);
      });
    } else {
      this.toastService.showError(response.message);
    }
  }

  back() {
    this.navCtrl.back();
  }
}
