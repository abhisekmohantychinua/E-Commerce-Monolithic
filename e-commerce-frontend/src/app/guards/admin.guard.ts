import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs/operators";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  return authService.userRole$.pipe(
    map((role) => {
      if (role && role === 'ADMIN') {
        return true;
      } else {
        return router.createUrlTree(['/'])
      }
    })
  );
};
