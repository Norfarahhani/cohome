import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseholdRoutingModule } from './household-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index/index.page';
import { CreatePage } from './create/create.page';



@NgModule({
  declarations: [IndexPage, CreatePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HouseholdRoutingModule,
    ComponentsModule
  ]
})
export class HouseholdModule { }
