import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  amount: number = 0;
  selected_category: string = '';
  date: string = '';
  notes: string = '';
  members: string[] = [];

  constructor(private expenseService: ExpenseService, private router: Router) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/expense']);
  }

  async create() {
    const register = await this.expenseService.createExpense(this.amount, this.selected_category, this.notes, this.date, this.members);
    this.router.navigate(['/home/expense']);
  }

}