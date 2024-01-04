import {ProductResponse} from "./product-response";
import {Address} from "./address";

export interface OrderResponse {
  id?: string,
  product?: ProductResponse,
  quantity?: number,
  price?: number,
  createdAt?: Date,
  status?: string,
  address?: Address
}
