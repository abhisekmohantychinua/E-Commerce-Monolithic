import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserResponse} from "../models/user-response";
import {UserRequest} from "../models/user-request";
import {Address} from "../models/address";
import {AddressRequest} from "../models/address-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  // ADMIN METHODS
  getAllUser() {
    return this.http.get<UserResponse[]>(`${environment.apiUrl}/user/all`)
  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`${environment.apiUrl}/user/${id}`)
  }

  updateUser(id: string, userRequest: UserRequest) {
    return this.http.put<UserResponse>(`${environment.apiUrl}/user/${id}`, userRequest)
  }

  deleteUser(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/user/${id}`)
  }

  getAllUserAddress(id: string) {
    return this.http.get<Address[]>(`${environment.apiUrl}/user/${id}/address`)
  }

  getAddressById(addId: number) {
    return this.http.get(`${environment.apiUrl}/user/address/${addId}`)
  }

  // USER METHODS
  getAuthUser() {
    return this.http.get<UserResponse>(`${environment.apiUrl}/user`)
  }

  updateAuthUser(userRequest: UserRequest) {
    return this.http.put<UserResponse>(`${environment.apiUrl}/user`, userRequest)
  }

  deleteAuthUser() {
    return this.http.delete<void>(`${environment.apiUrl}/user`)
  }

  getAuthUserAddress() {
    return this.http.get<Address[]>(`${environment.apiUrl}/user/address`)
  }

  addAuthUserAddress(addressRequest: AddressRequest) {
    return this.http.post<UserResponse>(`${environment.apiUrl}/user/address`, addressRequest)
  }

  // BOTH
  deleteAddress(addId: number) {
    return this.http.delete<void>(`${environment.apiUrl}/user/address/${addId}`)
  }
}
