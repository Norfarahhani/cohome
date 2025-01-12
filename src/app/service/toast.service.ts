import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) { }

  async showToast(message: string, duration: number = 2000, color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  async showSuccess(message: string) {
    await this.showToast(message, 2000, 'success');
  }

  async showError(message: string) {
    await this.showToast(message, 2000, 'danger');
  }
}
