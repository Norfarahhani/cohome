import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-task-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(private modalController: ModalController) { }

  

  // Method to handle task selection
  selectTask(taskName: string) {
    console.log('Selected Task:', taskName);

    // You can add any additional logic here, for example:
    // Navigating to another page or storing the selected task
  }

  ngOnInit() {
  }

}