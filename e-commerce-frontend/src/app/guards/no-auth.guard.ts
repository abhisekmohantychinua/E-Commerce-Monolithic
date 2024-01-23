import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/'])
  } else {
    return true;
  }
};
