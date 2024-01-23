import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {UserRequest} from "../models/user-request";
import {environment} from "../../environments/environment";
import {UserResponse} from "../models/user-response";
import {AuthRequest} from "../models/auth-request";
import {AuthResponse} from "../models/auth-response";
import {isPlatformBrowser} from "@angular/common";
import {jwtDecode} from "jwt-decode";
import {SnackbarService} from "./util/snackbar.service";
import {Router} from "@angular/router";
import {Roles} from "../models/roles";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userRoleSubject: BehaviorSubject<Roles> = new BehaviorSubject<Roles>(this.getUserRole());

  private http: HttpClient = inject(HttpClient)
  private snack: SnackbarService = inject(SnackbarService)
  private router: Router = inject(Router)
  private platformId = inject(PLATFORM_ID)


  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  get userRole$(): Observable<Roles> {
    return this.userRoleSubject.asObservable();
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId))
      return !!localStorage.getItem("token");
    else
      return false;
  }

  setJwt(jwt: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("token", jwt);
      this.loggedInSubject.next(true);
      const payload = jwtDecode(jwt) as any
      const userRole: Roles = payload.authorities[0].authority as 'ADMIN' | 'USER'
      console.log({token: jwt, role: userRole})
      this.userRoleSubject.next(userRole);
    }
  }

  getJwt(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("token");
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
      this.loggedInSubject.next(false);
      this.userRoleSubject.next(undefined);
      this.snack.openSnack('Logout successfully!!!');
      this.router.navigateByUrl('/');
    }
  }

  getUserRole(): Roles {
    const jwt = this.getJwt();
    if (jwt) {
      const payload = jwtDecode(jwt) as any;
      return payload.authorities[0].authority as Roles;
    }
    return undefined;
  }

  register(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.apiUrl}/auth/signup`, userRequest);
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/signin`, authRequest)
      .pipe(
        tap(response => {
          this.setJwt(response.token);
        })
      );
  }

  verify(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/auth/verify`, {params: {username: username}});
  }

}
