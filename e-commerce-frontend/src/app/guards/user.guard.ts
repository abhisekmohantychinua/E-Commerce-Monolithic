import {CanActivateFn, Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  const user = userService.fetchUser();
  if (user && user.id) {
    return true
  } else {
    router.navigate(['/login'])
  }
  return false;
};
