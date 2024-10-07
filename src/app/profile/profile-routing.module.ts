import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index/index.page';
import { DetailsPage } from './details/details.page';
import { HousePage } from './house/house.page';
import { PaymentPage } from './payment/payment.page';
import { NotificationPage } from './notification/notification.page';
import { SettingPage } from './setting/setting.page';

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
    path: 'notification',
    component: NotificationPage
  },
  {
    path: 'setting',
    component: SettingPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
