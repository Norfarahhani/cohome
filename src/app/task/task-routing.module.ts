import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { CreatePage } from './create/create.page';
import { ListPage } from './list/list.page';

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
    path: 'list',
    component: ListPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
