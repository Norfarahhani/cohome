import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  // Method to save the task
  saveTask() {
    // Add your task-saving logic here, e.g., form submission, validation, etc.
    console.log('Task saved!');

    // Optionally dismiss the modal after saving
    this.modalCtrl.dismiss();
  }

  // Method to dismiss the modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}


