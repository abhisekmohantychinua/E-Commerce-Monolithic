import {Injectable} from '@angular/core';
import {ProductResponse} from "../models/product-response";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  fetchProductByPageNo(pageNo: number = 0) {
    return this.http.get<ProductResponse[]>(`${environment.apiUrl}/products`, {
      params: {
        pageNo: pageNo
      }
    })
  }

  fetchProductByCategory(category: string) {
    return this.http.get<ProductResponse[]>(`${environment.apiUrl}/products/category/${category}`)
  }
}
