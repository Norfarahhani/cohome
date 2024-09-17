import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-task-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  // items: string[] = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];
  // filteredItems: string[] = this.items;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  public alertButtons = ['Save'];
  public alertInputs = [
    {
      type: 'task',
      placeholder: 'Enter Task',
    },

  ];

  // Method to open the modal
  async openTaskModal() {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent // Specify the modal component
    });
    await modal.present();
  }

  // This method gets triggered when the child emits the filtered items
  // onFilteredItemsChange(updatedFilteredItems: string[]) {
  //   this.filteredItems = updatedFilteredItems;
  // }
}
