import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { HouseholdService } from 'src/app/household/household.service';

@Component({
  selector: 'app-profile-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {
  code: string = '';

  constructor(
    private router: Router,
    private householdService: HouseholdService,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/profile']);
  }

  async joinHousehold() {
    const join = await this.householdService.joinHousehold(this.code);
    if (join.success) {
      this.presentAlert('Success', 'You have successfully joined the household!');
      this.authService.logoutUser();
      window.location.reload();
      // this.router.navigate(['/home/household']);
    } else {
      this.presentAlert('Error', 'Household not found, please try again.');
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
