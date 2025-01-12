import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptComponent {
  @Input() receiptUrl!: string;
  @Input() memberName!: string;

  constructor(private modalController: ModalController) { }

  dismissModal() {
    this.modalController.dismiss();
  }
}
