import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  name: string ='';
  selected_category: string = '';
  notes: string = '';
  selected_date: string ='';  

  constructor(private expenseService: ExpenseService, private router: Router) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/expense']);
  }

  async create() {
    const register = await this.expenseService.createExpense(this.name, this.selected_category, this.notes, this.selected_date);

  }
  // onDateChange() {
  //   // Handle any additional logic when the date changes
  //   console.log('Selected date:', this.selectedDate);
  // }
}