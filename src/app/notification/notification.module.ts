import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationPage } from './notification/notification.page';



@NgModule({
  declarations: [NotificationPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationRoutingModule,
    ComponentsModule
  ]
})
export class NotificationModule { }
