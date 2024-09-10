import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { personCircleOutline, barChartOutline, folderOpenOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor() {
    addIcons({ homeOutline,folderOpenOutline, barChartOutline, personCircleOutline });
  }
}