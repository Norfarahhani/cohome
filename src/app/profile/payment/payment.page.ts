import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';
import { ProfileService } from '../profile.service';
import { UserModel } from 'src/app/models/user.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  user: UserModel = new UserModel();
  constructor(
    private navCtrl: NavController,
    private toastService: ToastService,
    private profileService: ProfileService,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getQrCode();
  }

  async getQrCode() {
    this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
  }

  async uploadQrCode() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Set QR Code',
      buttons: [
        {
          text: 'Choose from Gallery',
          icon: 'images-outline',
          handler: () => this.capturePhoto(CameraSource.Photos),
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async capturePhoto(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source,
        resultType: CameraResultType.DataUrl,
      });

      this.user.qr_code_url = image.dataUrl;
    } catch (error) {
      console.error('Error capturing photo:', error);
      this.toastService.showError('Failed to update QR code.');
    }
  }

  async saveQrCode() {
    if (!this.user.qr_code_url) {
      this.toastService.showError('Please upload a QR code before saving.');
      return;
    }
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.profileService.uploadQrCode(this.user.qr_code_url);
    await loading.dismiss();
    if (response.success) {
      this.toastService.showSuccess('QR code saved successfully.');
    } else {
      this.toastService.showError('Failed to save QR code.');
    }
  }

  async back() {
    this.navCtrl.back();
  }
}
