import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import { ExpenseModel } from 'src/app/models/expense.model';
import { HouseholdMemberModel } from 'src/app/models/household-member.model';
import { HouseholdService } from 'src/app/household/household.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-expense-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  expense: ExpenseModel = new ExpenseModel();
  householdMemberModels: HouseholdMemberModel[] = [];

  constructor(
    private expenseService: ExpenseService, 
    private householdService: HouseholdService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.getHouseholdMembers();
  }

  async cancelCreate() {
    this.router.navigate(['/home/expense']);
  }

  async create() {
    const register = await this.expenseService.createExpense(this.expense);
    this.router.navigate(['/home/expense']);
  }

  getHouseholdMembers() {
    this.householdService.getHouseholdMembers().subscribe({
      next: (data: any) => {
        if (data) {
          this.householdMemberModels = data;
          this.householdMemberModels = this.householdMemberModels.filter(item => item.member_id !== getAuth().currentUser?.uid);
        }
      },
      error: (error) => {
        console.error('Error fetching household details:', error);
      }
    });
  }

}
