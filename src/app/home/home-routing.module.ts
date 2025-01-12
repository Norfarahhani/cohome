import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'household',
      },
      {
        path: 'household',
        loadChildren: () => import('../household/household.module').then((m) => m.HouseholdModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'task',
        loadChildren: () => import('../task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'expense',
        loadChildren: () => import('../expense/expense.module').then((m) => m.ExpenseModule),
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then((m) => m.NotificationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
