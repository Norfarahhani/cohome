import { Component, OnInit } from '@angular/core';
import { CreatePage } from '../create/create.page';
import { ModalController } from '@ionic/angular';
import { ExpenseService } from '../expense.service';
import { ExpenseModel } from 'src/app/models/expense.model';
import { ExpenseMemberModel } from 'src/app/models/expense-member.model';

@Component({
  selector: 'app-expense-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  expenseModels: ExpenseModel[] = [];
  expenseMemberModels: ExpenseMemberModel[] = [];
  selectedSegment: string = 'card1';

  constructor(
    private modalController: ModalController,
    private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.getOwnExpenses();
    this.getOtherExpenses();
  }

  async openCreateExpenseModal() {
    const expenseModal = await this.modalController.create({
      component: CreatePage,
    });

    expenseModal.onDidDismiss().then((result) => {
      this.getOwnExpenses();
      this.getOtherExpenses();
    });

    await expenseModal.present();
  }

  async getOwnExpenses() {
    const response = await this.expenseService.getExpenses(true);
    this.expenseModels = response.data;
  }

  async getOtherExpenses() {
    const response = await this.expenseService.getExpenses();
    this.expenseMemberModels = response.data;
  }

  refreshData(event: any) {
    setTimeout(() => {
      this.getOwnExpenses();
      this.getOtherExpenses();
      event.target.complete();
    }, 2000);
  }

  notifyParent() {
    this.getOwnExpenses();
    this.getOtherExpenses();
  }

}
