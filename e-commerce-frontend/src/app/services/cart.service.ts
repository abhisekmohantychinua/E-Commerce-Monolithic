import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CartResponse} from "../models/cart-response";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  addProductCart(prodId: string, quantity: number = 1) {
    return this.http.post<CartResponse>(`${environment.apiUrl}/user/cart`, {}, {
      params: {
        prodId: prodId,
        quantity: quantity
      }
    })
  }

  getAllCartOfUser() {
    return this.http.get<CartResponse[]>(`${environment.apiUrl}/user/cart`)
  }

  getUserCartById(cartId: number) {
    return this.http.get(`${environment.apiUrl}/user/cart/${cartId}`)
  }

  updateUserCartProductQuantity(cartId: number, quantity: number) {
    return this.http.put(`${environment.apiUrl}/user/cart/${cartId}`, {}, {
      params: {
        quantity: quantity
      }
    })
  }

  removeCart(cartId: number) {
    return this.http.delete(`${environment.apiUrl}/user/cart/${cartId}`)
  }
}
