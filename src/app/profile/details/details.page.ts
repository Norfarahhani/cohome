import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { UserModel } from 'src/app/models/user.model';
import { ToastService } from 'src/app/service/toast.service';
import { ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  userModel: UserModel = new UserModel();

  constructor(
    private navCtrl: NavController,
    private profileService: ProfileService,
    private toastService: ToastService,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }

  async back() {
    this.navCtrl.back();
  }

  async getUserDetails() {
    const response = await this.profileService.getUserDetails();
    this.userModel = response;
  }

  async selectPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Set Profile Photo',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera-outline',
          handler: () => this.capturePhoto(CameraSource.Camera),
        },
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

      this.userModel.avatar_url = image.dataUrl;
    } catch (error) {
      console.error('Error capturing photo:', error);
      this.toastService.showError('Failed to update profile photo.');
    }
  }

  async updateUserDetails() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.profileService.updateUserDetails(this.userModel);
    await loading.dismiss();
    if (response.success) {
      this.userModel = response.data;
      this.profileService.triggerRefreshProfile();
      this.toastService.showSuccess(response.message);
    } else {
      this.toastService.showError(response.message);
    }
  }

}
