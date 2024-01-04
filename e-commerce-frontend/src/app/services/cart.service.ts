import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CartResponse} from "../models/cart-response";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getUserCart(id: string) {
    return this.http.get<CartResponse[]>(`${environment.apiUrl}/user/${id}/cart`)
  }

  updateUserCartQuantity(cartId: number, quantity: number) {
    const user = this.userService.fetchUser();
    return this.http.put(`${environment.apiUrl}/user/${user?.id}/cart/${cartId}`, {}, {
      params: {
        quantity: quantity
      }
    })
  }
}
