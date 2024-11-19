import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { ExpenseModel } from 'src/app/models/expense.model';
import { HouseholdService } from 'src/app/household/household.service';
import { HouseholdMemberModel } from 'src/app/models/household-member.model';
import { getAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-expense-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    expenseId: string = this.route.snapshot.paramMap.get('id') ?? '';
    expenseModel: ExpenseModel = new ExpenseModel();
    householdMemberModels: HouseholdMemberModel[] = [];

    constructor(
        private router: Router,
        private expenseService: ExpenseService,
        private householdService: HouseholdService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getExpenseDetails();
        this.getHouseholdMembers();
    }

    async cancelCreate() {
        this.router.navigate(['/home/expense']);
    }

    getExpenseDetails() {
        this.expenseService.getExpenseDetails(this.expenseId).subscribe({
            next: (data: any) => {
                if (data) {
                    this.expenseModel = data;
                }
            },
            error: (error) => {
                console.error('Error fetching household details:', error);
            }
        });
    }

    async updateExpenseDetails() {
        if (!this.expenseId) {
            console.error('Expense model is not defined.');
            return;
          }
        
          try {
            await this.expenseService.updateExpenseDetails(this.expenseId, this.expenseModel);
            console.log('Expense updated successfully');
            this.router.navigate(['/home/expense']);
          } catch (error) {
            console.error('Error updating expense details:', error);
          }
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