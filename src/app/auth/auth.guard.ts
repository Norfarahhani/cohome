import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth); // Inject Firebase Auth service
  const router = inject(Router); // Inject Router for navigation

  return new Observable<boolean>((observer) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, allow access to the route
        observer.next(true);
      } else {
        // User is not authenticated, redirect to login page
        router.navigate(['/auth/login']);
        observer.next(false);
      }
      observer.complete();
    });
  });
};
