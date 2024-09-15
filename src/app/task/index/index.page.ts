import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  // items: string[] = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];
  // filteredItems: string[] = this.items;

  constructor() { }

  ngOnInit() {
  }

  // This method gets triggered when the child emits the filtered items
  // onFilteredItemsChange(updatedFilteredItems: string[]) {
  //   this.filteredItems = updatedFilteredItems;
  // }
}
