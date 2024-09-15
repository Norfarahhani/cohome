import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // @Input() items: string[] = []; // Accepts the array of items from the parent
  // @Output() filteredItemsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  // filteredItems: string[] = [];

  constructor() {
    // this.filteredItems = this.items;
  }

  // Emit the filtered items whenever the input changes
  // filterItems(event: any) {
  //   const searchTerm = event.target.value.toLowerCase();
  //   this.filteredItems = this.items.filter(item =>
  //     item.toLowerCase().includes(searchTerm)
  //   );
  //   this.filteredItemsChange.emit(this.filteredItems); // Emit the updated filtered items
  // }
}
