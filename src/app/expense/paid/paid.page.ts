import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { ExpenseMemberModel } from 'src/app/models/expense-member.model';


@Component({
    selector: 'app-expense-paid',
    templateUrl: './paid.page.html',
    styleUrls: ['./paid.page.scss'],
})
export class PaidPage implements OnInit {
    expenseMemberModels: ExpenseMemberModel[] = [];

    constructor(
        private expenseService: ExpenseService
    ) { }

    ngOnInit() {
        this.getOtherExpenses();
    }

    async onCheckboxChange(event: any, id: string) {
        await this.expenseService.updateStatus(event.detail.checked, id);
    }

    getOtherExpenses() {
        this.expenseService.getOtherExpenses().subscribe({
            next: (data: any) => {
                if (data) {
                    this.expenseMemberModels = data;
                }
            },
            error: (error) => {
                console.error('Error fetching household details:', error);
            }
        });
    }

}