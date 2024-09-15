import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-household-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  selectedSegment: string = 'card1'; 

  constructor() { }

  ngOnInit() {
  }
  public alertButtons = ['Invite'];
  public alertInputs = [
    {
      type: 'email',
      placeholder: 'Enter Email',
    },
  ];
}

