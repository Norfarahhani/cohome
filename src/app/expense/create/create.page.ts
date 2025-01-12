import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseModel } from 'src/app/models/expense.model';
import { ExpenseService } from '../expense.service';
import { HouseholdService } from 'src/app/household/household.service';
import { ToastService } from 'src/app/service/toast.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-expense-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  expense: ExpenseModel = new ExpenseModel();
  householdMembers: any;

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private householdService: HouseholdService,
    private toastService: ToastService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.getHouseholdMembers();
  }

  async dismissModal() {
    this.modal.dismiss();
  }

  async createExpense() {
    const response: any = await this.expenseService.createExpense(this.expense);
    if (response.success) {
      this.modal.dismiss().then(() => {
        this.toastService.showSuccess(response.message);
      });
    } else {
      this.toastService.showError(response.message);
    }
  }

  async getHouseholdMembers() {
    const response = await this.householdService.getHouseholdDetails();
    if (response.success) {
      this.householdMembers = response.data.household_members;
      this.householdMembers = this.householdMembers.filter((member: any) => member.user.id !== JSON.parse(localStorage.getItem('user') ?? '').id);
    }
  }
}
