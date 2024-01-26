import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

const publicEndpoints: string[] = [
  '/api/auth',
  '/api/products'
]

const isSecure = (url: string) => {
  for (let endpoint of publicEndpoints) {
    if (url.indexOf(endpoint) >= 0) {
      return false;
    }
  }
  return true;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AuthService).getJwt()


  if (jwt && isSecure(req.url)) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`)
    })
    return next(newReq)
  }

  return next(req);
};
