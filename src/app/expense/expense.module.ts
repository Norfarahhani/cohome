import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index/index.page';
import { CreatePage } from './create/create.page';
import { PaidPage } from './paid/paid.page';
import { UnpaidPage } from './unpaid/unpaid.page';
import { EditPage } from './edit/edit.page';



@NgModule({
  declarations: [IndexPage, CreatePage, PaidPage, UnpaidPage, EditPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseRoutingModule,
    ComponentsModule
  ]
})
export class ExpenseModule { }