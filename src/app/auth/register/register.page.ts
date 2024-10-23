import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  name: string = '';
  age: number | null = null;
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private auth: Auth, private router: Router, private alertController: AlertController) { }
  
  ngOnInit() {
  }

  async register() {
    // Basic form validation
    if (this.password !== this.confirmPassword) {
      await this.presentAlert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      // Optionally, you can save additional user data (name, age, phone) to Firestore here
      console.log('User registered:', userCredential);
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
