import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './details/details.page';



@NgModule({
  declarations: [DetailsPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileRoutingModule,
    ComponentsModule
  ]
})
export class ProfileModule { }