import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchTerm: string = '';
  items: string[] = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];
  filteredItems: string[] = [];

  constructor() {
    this.filteredItems = this.items;
  }

  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredItems = this.items.filter(item => item.toLowerCase().includes(searchTerm));
  }
}
