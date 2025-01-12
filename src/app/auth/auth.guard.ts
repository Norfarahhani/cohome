import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  try {
    const authenticated = localStorage.getItem('access_token') !== null;

    if (authenticated) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    router.navigate(['/auth/login']);
    return false;
  }
};
