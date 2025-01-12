import { HouseholdModel } from './../../models/household.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HouseholdService } from '../household.service';
import { HouseholdMemberModel } from 'src/app/models/household-member.model';
import { ToastService } from 'src/app/service/toast.service';
import { AlertController, ModalController } from '@ionic/angular';
import { QrCodeComponent } from '../qrcode/qrcode.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-household-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit, OnDestroy {
  selectedSegment: string = 'card1';
  hasHousehold: boolean = false;
  householdModel: HouseholdModel = new HouseholdModel();
  householdData: any;
  householdMemberModels: HouseholdMemberModel[] = [];
  isLeader: boolean = false;
  loading: boolean = true;
  currentUser: any;
  subscription: Subscription = new Subscription();

  constructor(
    private householdService: HouseholdService,
    private toastService: ToastService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.getLocalStorage();
    if (this.hasHousehold) await this.getHouseholdDetails();
    this.subscription = this.householdService.refreshHousehold$.subscribe(() => {
      this.getLocalStorage();
      this.getHouseholdDetails();
    });
  }

  async createHousehold() {
    const response: any = await this.householdService.createHousehold(this.householdModel);
    if (response.success) {
      this.getLocalStorage();
      this.toastService.showSuccess(response.message);
    } else {
      this.toastService.showError(response.message);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLocalStorage() {
    this.hasHousehold = localStorage.getItem('has_household') === 'true';
    this.isLeader = localStorage.getItem('is_leader') === 'true';
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  async getHouseholdDetails() {
    const response: any = await this.householdService.getHouseholdDetails();
    if (response.success) {
      this.householdData = response.data;
      this.loading = false;
    }
  }

  async inviteMember(email: string) {
    const response: any = await this.householdService.inviteMember(email);
    if (response.success) {
      this.toastService.showSuccess(response.message);
    } else {
      this.toastService.showError(response.message);
    }
  }

  async presentInviteAlert() {
    const alert = await this.alertController.create({
      header: 'Invite Member',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter Email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: (data) => {
            this.inviteMember(data.email);
          },
        },
      ],
    });

    await alert.present();
  }

  async openQrCodeModal(member: any) {
    const qrCodeModal = await this.modalController.create({
      component: QrCodeComponent,
      componentProps: {
        qrCodeUrl: member.qr_code_url,
        memberName: member.name,
      },
    });

    await qrCodeModal.present();
  }

  async deleteMember(memberId: string) {
    await this.alertController.create({
      header: 'Remove Member',
      message: 'Are you sure you want to remove this member?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Remove', handler: async () => {
            const response: any = await this.householdService.deleteMember(memberId);
            if (response.success) {
              this.toastService.showSuccess(response.message);
              this.getHouseholdDetails();
            }
          }
        },
      ],
    }).then(alert => alert.present());
  }

  refreshData(event: any) {
    setTimeout(() => {
      this.getHouseholdDetails();
      event.target.complete();
    }, 2000);
  }
}

