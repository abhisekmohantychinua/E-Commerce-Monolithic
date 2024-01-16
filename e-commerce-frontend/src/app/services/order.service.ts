import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {OrderRequest} from "../models/order-request";
import {environment} from "../../environments/environment";
import {OrderResponse} from "../models/order-response";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  createOrder(orderRequest: OrderRequest) {
    return this.http.post<OrderResponse>(`${environment.apiUrl}/user/orders`, {}, {
      params: {
        prodId: orderRequest.productId,
        quantity: orderRequest.quantity,
        addId: orderRequest.addressId
      }
    })
  }

  getAllUserOrder(id?: string) {
    let params: HttpParams = new HttpParams()
    if (id)
      params = params.set("userId", id)

    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/user/orders`, {params: params})
  }

  getAllOrder() {
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/user/orders/all`)
  }

  getUserOrderById(orderId: string) {
    return this.http.get<OrderResponse>(`${environment.apiUrl}/user/orders/${orderId}`)
  }

  cancelOrder(orderId: string) {
    return this.http.delete<void>(`${environment.apiUrl}/user/orders/${orderId}`)
  }

  deliverOrder(orderId: string) {
    return this.http.post<void>(`${environment.apiUrl}/user/orders/${orderId}/deliver`, {})
  }
}
