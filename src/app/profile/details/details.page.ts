import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
    selector: 'app-expense-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    constructor() { }

    @ViewChild(IonModal) modal !: IonModal; // Access the modal via ViewChild

    ngOnInit() {
    }

    // Method to open the modal
    openModal() {
        this.modal.present();
    }

    // Method to close the modal
    closeModal() {
        this.modal.dismiss();
    }
}