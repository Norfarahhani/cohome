import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private loadingController: LoadingController,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  async onSendResetLink() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const result = await this.authService.sendResetLink(this.email);
    await loading.dismiss();

    if (result.success) {
      await this.toastService.showSuccess(result.message);
    } else {
      await this.toastService.showError(result.message);
    }
  }
}
