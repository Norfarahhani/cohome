import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-expense-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {

  selectedCategory: string = '';
  selectedDate: string ='';  // Holds the selected date

  constructor() { }

  ngOnInit() {
  }
  
  onDateChange() {
    // Handle any additional logic when the date changes
    console.log('Selected date:', this.selectedDate);
  }
}