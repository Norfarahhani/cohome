import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { DetailsPage } from './details/details.page';
import { HousePage } from './house/house.page';
import { PaymentPage } from './payment/payment.page';
import { SettingPage } from './setting/setting.page';
import { JoinPage } from './join/join.page';
import { SummaryPage } from './summary/summary.page';
import { InvitationPage } from './invitation/invitation.page';

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
  {
    path: 'payment',
    component: PaymentPage
  },
  {
    path: 'setting',
    component: SettingPage
  },
  {
    path: 'join',
    component: JoinPage
  },
  {
    path: 'summary',
    component: SummaryPage
  },
  {
    path: 'invitation/:id',
    component: InvitationPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
