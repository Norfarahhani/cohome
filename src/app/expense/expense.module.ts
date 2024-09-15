import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index/index.page';



@NgModule({
  declarations: [IndexPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseRoutingModule,
    ComponentsModule
  ]
})
export class ExpenseModule { }