import {inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRequest} from "../models/user-request";
import {environment} from "../../environments/environment";
import {UserResponse} from "../models/user-response";
import {AuthRequest} from "../models/auth-request";
import {AuthResponse} from "../models/auth-response";
import {isPlatformBrowser} from "@angular/common";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  platformId = inject(PLATFORM_ID)
  loginStatus: WritableSignal<boolean> = signal(this.isLoggedIn())

  constructor(private http: HttpClient) {
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId))
      return !!localStorage.getItem("token")
    else
      return false
  }

  setJwt(jwt: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("token", jwt)
      this.loginStatus.set(false)
    }
  }

  getJwt() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("token")
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token")
      this.loginStatus.set(false)
    }
  }

  getUserRole() {
    const jwt = this.getJwt()
    if (jwt) {
      const payload = jwtDecode<JwtPayload>(jwt)
      console.log(payload)
      return 'ADMIN'
    }
    return 'USER'
  }

  register(userRequest: UserRequest) {
    return this.http.post<UserResponse>(`${environment.apiUrl}/auth/signup`, userRequest)
  }

  login(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/signin`, authRequest)
  }

  verify(username: string) {
    return this.http.get<boolean>(`${environment.apiUrl}/auth/verify`, {params: {username: username}})
  }
}
