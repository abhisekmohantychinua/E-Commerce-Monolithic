import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductResponse} from "../models/product-response";
import {Categories} from "../models/categories";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  // ADMIN METHODS
  addProduct(formData: FormData) {
    return this.http.post<ProductResponse>(`${environment.apiUrl}/products`, formData)
  }

  deleteProductById(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/products/${id}`)
  }

  // USER METHODS
  getAllProducts(pageNo?: number, category?: Categories, orderBy?: 'LOW_TO_HIGH' | 'HIGH_TO_LOW') {
    let queryParams: HttpParams = new HttpParams();
    if (pageNo) {
      queryParams = queryParams.set("pageNo", pageNo)
    }
    if (category) {
      queryParams = queryParams.set("category", category)
    }
    if (orderBy) {
      queryParams = queryParams.set("orderBy", orderBy)
    }
    return this.http.get<ProductResponse[]>(`${environment.apiUrl}/products`, {params: queryParams})
  }

  findProductById(productId: string) {
    return this.http.get<ProductResponse>(`${environment.apiUrl}/products/${productId}`)
  }

}
