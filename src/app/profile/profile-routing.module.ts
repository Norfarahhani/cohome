import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { DetailsPage } from './details/details.page';
import { HousePage } from './house/house.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  },
  {
    path: 'details',
    component: DetailsPage
  },
  {
    path: 'house',
    component: HousePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
