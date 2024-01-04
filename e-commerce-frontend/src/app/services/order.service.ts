import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {OrderResponse} from "../models/order-response";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }


  getAllUserOrdersById(id: string) {
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/user/${id}/orders`)
  }

  orderDelivered(id: string, orderId: string) {
    return this.http.post(`${environment.apiUrl}/user/${id}/orders/${orderId}/deliver`, {})
  }

  cancelOrder(id: string, orderId: string) {
    return this.http.delete(`${environment.apiUrl}/user/${id}/orders/${orderId}`)
  }
}
