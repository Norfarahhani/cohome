import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'app-expense-unpaid',
    templateUrl: './unpaid.page.html',
    styleUrls: ['./unpaid.page.scss'],
})
export class UnpaidPage implements OnInit {

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() {
    }

}