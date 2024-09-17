import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  repeatReminder: boolean = false; // Toggle state
  repeatTime: string = ''; // Initialize with an empty string
  selectedRepeatOption: string = ''; // Selected repeat option
  selectedMember: string=''; // assign task kepada siapa

  constructor() { }

  ngOnInit() {
  }

  toggleReminder(event: any) {
    // Logic to handle toggle change
    console.log('Repeat Reminder:', this.repeatReminder);
  }
}



