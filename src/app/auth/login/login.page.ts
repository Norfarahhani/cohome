import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  async ngOnInit() {
    await this.authService.initializeSocialLogin();
  }

  async onLogin() {
    try {
      await this.authService.loginUser(this.email, this.password);
      this.router.navigate(['/home']); // Navigate to home after successful login
    } catch (error: any) {
      await this.presentAlert('Error', error.message);
    }
  }

  async onLoginWithGoogle() {
    try {
      await this.authService.loginUserWithGoogle();
      this.router.navigate(['/home']); // Navigate to home after successful login
    } catch (error: any) {
      await this.presentAlert('Error', error.message);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
