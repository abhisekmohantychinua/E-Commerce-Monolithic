import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";


const isSecure = (url: string, method: string) => {

  if (url.indexOf('/api/products') >= 0) {
    return method.toLowerCase() === 'post' || method.toLowerCase() === 'delete';
  }
  return true;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AuthService).getJwt()
  if (jwt && isSecure(req.url, req.method)) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`)
    })
    return next(newReq)
  }

  return next(req);
};
