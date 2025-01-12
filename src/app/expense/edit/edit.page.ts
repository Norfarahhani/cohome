import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseModel } from 'src/app/models/expense.model';
import { ExpenseService } from '../expense.service';
import { HouseholdService } from 'src/app/household/household.service';
import { ToastService } from 'src/app/service/toast.service';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  expense: ExpenseModel = new ExpenseModel();
  householdMembers: any;
  expenseId: string = '';

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private householdService: HouseholdService,
    private toastService: ToastService,
    private modalController: ModalController,
    private navParams: NavParams,
    private loadingController: LoadingController
  ) {
    this.expenseId = this.navParams.get('id');
  }

  ngOnInit() {
    this.getHouseholdMembers();
    this.loadExpenseDetails();

  }

  async dismissModal() {
    this.modalController.dismiss();
  }

  async loadExpenseDetails() {
    const response: any = await this.expenseService.getExpenseById(this.expenseId);
    if (response.success) {
      this.expense = response.data;
      this.expense.expense_members = this.expense.expense_members?.map((member: any) => member.user.id);
    }
  }

  async updateExpenseDetails() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.expenseService.updateExpense(this.expense);
    await loading.dismiss();
    if (response.success) {
      this.modalController.dismiss().then(() => {
        this.toastService.showSuccess(response.message);
      });
    } else {
      this.toastService.showError('Failed to update expense.');
    }
  }

  async getHouseholdMembers() {
    const response = await this.householdService.getHouseholdDetails();
    if (response.success) {
      this.householdMembers = response.data.household_members;
      this.householdMembers = this.householdMembers.filter(
        (member: any) => member.user.id !== JSON.parse(localStorage.getItem('user') ?? '').id
      );
    }
  }

  async deleteExpense() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    const response: any = await this.expenseService.deleteExpense(this.expenseId);
    await loading.dismiss();
    if (response.success) {
      this.modalController.dismiss().then(() => {
        this.toastService.showSuccess(response.message);
      });
    }
  }
}
