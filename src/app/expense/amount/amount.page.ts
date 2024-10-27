import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {

  name: string ='';
  selected_category: string = '';
  notes: string = '';
  selected_date: string ='';  

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  async create() {
    const register = await this.expenseService.createExpense(this.name, this.selected_category, this.notes, this.selected_date);

  }
  // onDateChange() {
  //   // Handle any additional logic when the date changes
  //   console.log('Selected date:', this.selectedDate);
  // }
}