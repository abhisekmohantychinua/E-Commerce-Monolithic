import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderResponse} from "../models/order-response";
import {environment} from "../../environments/environment";
import {UserResponse} from "../models/user-response";
import {UserRequest} from "../models/user-request";
import {Address} from "../models/address";
import {ProductResponse} from "../models/product-response";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  // ORDER METHODS
  getAllOrder() {
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/admin/orders/all`)
  }

  getAllUserOrder(id: string) {
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/admin/orders/user/${id}`)
  }

  getOrderById(orderId: string) {
    return this.http.get<OrderResponse>(`${environment.apiUrl}/admin/orders/${orderId}`)
  }

  // USER METHODS
  getAllUser() {
    return this.http.get<UserResponse[]>(`${environment.apiUrl}/admin/users/all`)
  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`${environment.apiUrl}/admin/users/${id}`)
  }

  updateUser(id: string, userRequest: UserRequest) {
    return this.http.put<UserResponse>(`${environment.apiUrl}/admin/users/${id}`, userRequest)
  }

  deleteUser(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/admin/users/${id}`)
  }

  // ADDRESS METHODS
  getAllUserAddress(id: string) {
    return this.http.get<Address[]>(`${environment.apiUrl}/admin/users/${id}/address`)
  }

  getAddressById(addId: number) {
    return this.http.get(`${environment.apiUrl}/admin/address/${addId}`)
  }

  deleteAddressById(addId: number) {
    return this.http.delete(`${environment.apiUrl}/admin/address/${addId}`)
  }

  // PRODUCT METHODS
  advanceSearchProduct(query: string, searchBy: string) {
    return this.http.get<ProductResponse[]>(`${environment.apiUrl}/admin/products/search`, {
      params: {
        query: query,
        searchBy: searchBy
      }
    })
  }
}
