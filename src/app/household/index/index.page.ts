import { HouseholdModel } from './../../models/household.model';
import { Component, OnInit } from '@angular/core';
import { HouseholdService } from '../household.service';
import { AlertController } from '@ionic/angular';
import { HouseholdMemberModel } from 'src/app/models/household-member.model';

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
  householdModel: HouseholdModel = new HouseholdModel();
  householdMemberModels: HouseholdMemberModel[] = [];
  isLeader: boolean = false;

  constructor(private householdService: HouseholdService, private alertController: AlertController) { }

  ngOnInit() {
    this.householdCheck();
    this.leaderCheck();

    if (this.hasHousehold) {
      this.getHousehold();
      this.getHouseholdMembers();
    }
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

  householdCheck() {
    const check = localStorage.getItem('hasHousehold');
    this.hasHousehold = (check == 'true') ? true : false;
  }

  leaderCheck() {
    const check = localStorage.getItem('isLeader');
    this.isLeader = (check == 'true') ? true : false;
  }

  getHousehold() {
    this.householdService.getHousehold().subscribe({
      next: (data: any) => {
        if (data) {
          this.householdModel = data;
        }
      },
      error: (error) => {
        console.error('Error fetching household details:', error);
      }
    });
  }

  getHouseholdMembers() {
    this.householdService.getHouseholdMembers().subscribe({
      next: (data: any) => {
        if (data) {
          this.householdMemberModels = data;
        }
      },
      error: (error) => {
        console.error('Error fetching household details:', error);
      }
    });
  }
}

