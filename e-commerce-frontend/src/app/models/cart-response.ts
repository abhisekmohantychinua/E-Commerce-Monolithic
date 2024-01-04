import {ProductResponse} from "./product-response";

export interface CartResponse {
  id: number,
  product: ProductResponse,
  quantity: number
}
