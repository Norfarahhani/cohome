import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { AmountPage } from './amount/amount.page';
import { PaidPage } from './paid/paid.page';
import { AssignPage } from './assign/assign.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  },
  {
    path: '',
    component: AmountPage
  },
  {
    path: '',
    component: PaidPage
  },
  {
    path: '',
    component: AssignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }