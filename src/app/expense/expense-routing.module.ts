import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import {CreatePage } from './create/create.page';
import { PaidPage } from './paid/paid.page';
import { UnpaidPage } from './unpaid/unpaid.page';
import { EditPage } from './edit/edit.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  },
  {
    path: 'create',
    component: CreatePage
  },
  {
    path: '',
    component: PaidPage
  },
  {
    path: '',
    component: UnpaidPage
  },
  {
    path: 'edit',
    component: EditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }