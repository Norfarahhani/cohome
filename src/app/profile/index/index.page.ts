import { Component, OnInit,} from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-profile-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }


  ngOnInit() {
  }
}
