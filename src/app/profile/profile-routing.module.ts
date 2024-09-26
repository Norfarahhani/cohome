import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { DetailsPage } from './details/details.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  },
  {
    path: 'details',
    component: DetailsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
