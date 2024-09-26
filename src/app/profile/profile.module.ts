import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index/index.page';
import { DetailsPage } from './details/details.page';
import { HousePage } from './house/house.page';



@NgModule({
  declarations: [IndexPage, DetailsPage, HousePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileRoutingModule,
    ComponentsModule
  ]
})
export class ProfileModule { }
