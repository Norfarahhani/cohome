import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { ExpenseModel } from 'src/app/models/expense.model';
import { ExpenseMemberModel } from 'src/app/models/expense-member.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-expense-unpaid',
  templateUrl: './unpaid.page.html',
  styleUrls: ['./unpaid.page.scss'],
})
export class UnpaidPage implements OnInit {
  expenseModels: ExpenseModel[] = [];
  paid: boolean = false;

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOwnExpenses();
  }

  getOwnExpenses() {
    this.expenseService.getOwnExpenses().subscribe({
      next: (expenses: any[]) => {
        if (expenses) {
          this.expenseModels = expenses;
          console.log(this.expenseModels);

          expenses.forEach((expense) => {
            this.expenseService.getExpenseMembers(expense.id).subscribe({
              next: (members: any[]) => {
                this.paid = members.every(item => item.status === true);
              },
              error: (error) => {
                console.error('Error fetching expense members:', error);
              }
            });
          });
        }
      },
      error: (error) => {
        console.error('Error fetching expenses:', error);
      }
    });
  }

  navigateToEditExpense(id: string) {
    this.router.navigate(['/expense/edit', id]);
  }

}