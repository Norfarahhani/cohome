import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { CreatePage } from './create/create.page';
import { ListPage } from './list/list.page';
import { DayPage } from './day/day.page';
import { ViewPage } from './view/view.page';

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
  {
    path: 'day',
    component: DayPage
  },
  {
    path: 'view/:id',
    component: ViewPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
