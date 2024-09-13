import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  onCreateClick() {
    console.log('Create button clicked');
    // Add your logic for what happens when the button is clicked
  }
}
