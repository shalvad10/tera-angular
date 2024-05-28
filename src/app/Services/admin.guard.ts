import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isAdmin() && userService.isAuthenticatedUser()) {
    return true;
  } else {
    router.navigate(['']);
    alert('გვერდზე წვდომის მისაღებად გაიარეთ ავტორიზაცია Admin-ის იუზერით');
    return false;
  }
};
