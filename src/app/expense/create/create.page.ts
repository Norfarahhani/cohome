import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import { ExpenseModel } from 'src/app/models/expense.model';

@Component({
  selector: 'app-expense-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  expense: ExpenseModel = new ExpenseModel();

  constructor(private expenseService: ExpenseService, private router: Router) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/expense']);
  }

  async create() {
    const register = await this.expenseService.createExpense(this.expense);
    this.router.navigate(['/home/expense']);
  }

}
