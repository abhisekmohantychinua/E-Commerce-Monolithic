import {Categories} from "./categories";

export interface ProductRequest {
  name: string,
  category: Categories | undefined,
  price: number,
  quantity: number,
  image: File | null
}
