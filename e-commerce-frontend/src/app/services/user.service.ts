import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserResponse} from "../models/user-response";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  platformId = inject(PLATFORM_ID)

  constructor(private http: HttpClient) {
  }

  getUserByUserId(id: string) {
    return this.http.get<UserResponse>(`${environment.apiUrl}/user/${id}`)
  }

  storeUser(user: UserResponse) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("userId", JSON.stringify(user));
    }
  }

  fetchUser(): null | UserResponse {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem("userId");
      if (user) {
        return JSON.parse(user)
      }
    }
    return null
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
