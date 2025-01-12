import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { ExpenseMemberModel } from 'src/app/models/expense-member.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';
import { ReceiptComponent } from '../receipt/receipt.page';

@Component({
  selector: 'app-expense-paid',
  templateUrl: './paid.page.html',
  styleUrls: ['./paid.page.scss'],
})
export class PaidPage {
  expenseMembers: any;
  receipt: string = '';
  @Input() expenseMemberModels: ExpenseMemberModel[] = [];
  @Output() getOtherExpenses: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private expenseService: ExpenseService,
    private actionSheetController: ActionSheetController,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  async onCheckboxChange(event: any, id: any) {
    await this.expenseService.updatePaid(event.detail.checked, id);
    this.getOtherExpenses.emit(true);
  }

  getAmount(expense: ExpenseMemberModel): number {
    const amount = (expense.expense?.amount ?? 0) / (expense.expense?.expense_members?.length ?? 1);
    return parseFloat(amount.toFixed(2));
  }

  async uploadReceipt(id: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload Receipt',
      buttons: [
        {
          text: 'Choose from Gallery',
          icon: 'images-outline',
          handler: () => this.capturePhoto(CameraSource.Photos, id),
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

  async capturePhoto(source: CameraSource, id: any) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source,
        resultType: CameraResultType.DataUrl,
      });

      const response: any = await this.expenseService.uploadReceipt(image.dataUrl ?? '', id);
      if (response.success) {
        this.toastService.showSuccess('Receipt uploaded successfully.');
      } else {
        this.toastService.showError('Failed to upload receipt.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
      this.toastService.showError('Failed to upload receipt.');
    }
  }

  openReceiptModal(receiptUrl: any) {
    this.modalController
      .create({
        component: ReceiptComponent,
        componentProps: { receiptUrl },
      })
      .then((modal) => modal.present());
  }
}
