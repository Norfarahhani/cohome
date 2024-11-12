import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';

@Component({
    selector: 'app-expense-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

    amount: number = 0;
    selected_category: string = '';
    date: string = '';
    notes: string = '';
    members: string[] = [];  

    constructor(private router: Router, private expenseService: ExpenseService) { }

    ngOnInit() {
        this.getExpenseDetails();
    }

    async cancelCreate() {
        this.router.navigate(['/home/expense']);
      }

      async getExpenseDetails() {
        const data: any = await this.expenseService.getExpenseDetails();
        this.amount = data.amount;
        this.selected_category = data.selected_category;
        this.date = data.date;
        this.notes = data.notes;
    }

    async updateExpenseDetails() {
        const user: any = {
            amount: this.amount,
            selected_category: this.selected_category,
            date: this.date,
            notes: this.notes
        };

        await this.expenseService.updateExpenseDetails(user);

        this.router.navigate(['/home/expense']);
    }

}