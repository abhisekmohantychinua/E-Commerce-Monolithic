import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AuthService).getJwt()

  if (jwt) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`)
    })
    return next(newReq)
  }

  return next(req);
};
