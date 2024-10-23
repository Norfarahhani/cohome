import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  age: number = 0;
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {}
  ngOnInit() {
  }

  async register() {
    // Basic form validation
    if (this.password !== this.confirmPassword) {
      await this.presentAlert('Error', 'Passwords do not match!');
      return;
    }

    try {
      await this.authService.registerUser(this.email, this.password, { name: this.name, age: this.age, phone: this.phone });
      
      this.router.navigate(['/home']); // Navigate to another page after successful registration
    } catch (error) {
      await this.presentAlert('Error', "An error occured.");
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
