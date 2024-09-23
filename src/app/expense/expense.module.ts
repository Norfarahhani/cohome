import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index/index.page';
import { AmountPage } from './amount/amount.page';
import { PaidPage } from './paid/paid.page';
import { UnpaidPage } from './unpaid/unpaid.page';



@NgModule({
  declarations: [IndexPage, AmountPage, PaidPage, UnpaidPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseRoutingModule,
    ComponentsModule
  ]
})
export class ExpenseModule { }