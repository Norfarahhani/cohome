import { Component, OnInit } from '@angular/core';
import { HouseholdService } from '../household.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-household-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  selectedSegment: string = 'card1';
  household_name: string = '';
  household_address: string = '';
  hasHousehold: boolean = false;


  constructor(private householdService: HouseholdService, private alertController: AlertController) { }

  ngOnInit() {
    this.householdCheck();
  }

  public alertButtons = ['Invite'];
  public alertInputs = [
    {
      type: 'email',
      placeholder: 'Enter Email',
    },
  ];

  async create() {
    const register = await this.householdService.registerHousehold(this.household_name, this.household_address);
    if (register == true) {
      this.presentAlert("Info", "Household successfully created!");
    } else {
      this.presentAlert("Error", "An error occured...");
    }
    // this.router.navigate(['/auth/login']);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async householdCheck() {
    const household = await this.householdService.checkHousehold();
    if (household.length > 0) this.hasHousehold = true;
    // if (this.hasHousehold)
  }
}

