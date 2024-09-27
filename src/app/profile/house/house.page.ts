import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
    selector: 'app-profile-house',
    templateUrl: './house.page.html',
    styleUrls: ['./house.page.scss'],
})
export class HousePage implements OnInit {

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
