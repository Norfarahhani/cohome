import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { CreatePage } from './create/create.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  },
  {
    path: 'create',
    component: CreatePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
