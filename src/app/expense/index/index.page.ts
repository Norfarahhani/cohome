import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  selectedSegment: string = 'card1'; 

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
 
}