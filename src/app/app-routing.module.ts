import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'search',
    component: SearchComponent
  }, 

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'household',
    loadChildren: () => import('./household/household.module').then( m => m.HouseholdModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then( m => m.TaskModule),
    canActivate: [authGuard]
  },
  {
    path: 'expense',
    loadChildren: () => import('./expense/expense.module').then( m => m.ExpenseModule),
    canActivate: [authGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
