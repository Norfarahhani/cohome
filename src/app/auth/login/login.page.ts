import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../../service/toast.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.authService.checkAuth().then((auth) => {
      if (auth) {
        this.router.navigate(['/home']);
      }
    });
  }

  async onLogin() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const result = await this.authService.loginUser(this.email, this.password);
    await loading.dismiss();
    if (result.success) {
      await this.toastService.showSuccess(result.message);
      this.router.navigate(['/home']);
    } else {
      await this.toastService.showError(result.message);
    }

  }

  async onLoginWithGoogle() {
    try {
      await this.authService.loginUserWithGoogle();
      await this.toastService.showSuccess('Google login successful!');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Google login failed:', error);
      await this.toastService.showError('Google login is not implemented yet.');
    }
  }
}
