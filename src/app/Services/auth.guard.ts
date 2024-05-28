import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isAuthenticatedUser()) {
    return true;
  } else {
    alert('გაიარეთ ავტორიზაცია.');
    router.navigate(['/login']);
    return false;
  }
}