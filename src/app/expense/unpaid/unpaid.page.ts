import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpenseModel } from 'src/app/models/expense.model';
import { Router } from '@angular/router';
import { EditPage } from '../edit/edit.page';
import { ModalController } from '@ionic/angular';
import { ExpenseMemberModel } from 'src/app/models/expense-member.model';
import { ReceiptComponent } from '../receipt/receipt.page';


@Component({
  selector: 'app-expense-unpaid',
  templateUrl: './unpaid.page.html',
  styleUrls: ['./unpaid.page.scss'],
})
export class UnpaidPage {
  paid: boolean = false;
  @Input() expenseModels: ExpenseModel[] = [];
  @Output() notifyParent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalController: ModalController
  ) { }

  async openEditExpenseModal(id: number) {
    const expenseModal = await this.modalController.create({
      component: EditPage,
      componentProps: {
        expenseId: id
      }
    });

    expenseModal.onDidDismiss().then((result) => {
      this.notifyParent.emit();
    });

    await expenseModal.present();
  }

  getPaidStatus(expenseMembers: ExpenseMemberModel[]) {
    return expenseMembers?.every(member => member.is_paid === 1) ? true : false;
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

