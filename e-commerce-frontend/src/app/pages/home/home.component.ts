import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../models/product-response";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {KeyValuePipe} from "@angular/common";
import {Categories} from "../../models/categories";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    MatCheckboxModule,
    MatButtonModule,
    KeyValuePipe,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = []
  pageNo: number = 0;
  isProductEmpty: boolean = false
  selectedCategory?: Categories
  categories: Categories[] = ["ELECTRONICS", "FASHION", "BEAUTY", "GROCERY", "ACCESSORIES"]
  orderBy: 'LOW_TO_HIGH' | 'HIGH_TO_LOW' = 'LOW_TO_HIGH'

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data
    })
  }

  loadMoreProduct(): void {
    this.pageNo++;
    this.productService.getAllProducts(this.pageNo, this.selectedCategory, this.orderBy).subscribe((data) => {
      this.products = this.products.concat(data);
      this.isProductEmpty = data.length === 0
    })
  }

  selectFilter(category: Categories) {
    if (this.selectedCategory !== category) {
      this.selectedCategory = category
    } else {
      this.selectedCategory = undefined
    }
    this.pageNo = 0;
    this.productService.getAllProducts(this.pageNo, this.selectedCategory, this.orderBy).subscribe((data) => {
      this.products = data
      this.isProductEmpty = data.length === 0
    })
  }


  priceFilter(priceFilter: 'LOW_TO_HIGH' | 'HIGH_TO_LOW') {
    this.pageNo = 0;
    this.orderBy = priceFilter
    this
      .productService
      .getAllProducts(this.pageNo, this.selectedCategory, this.orderBy).subscribe((data) => {
      this.products = data
      this.isProductEmpty = data.length === 0
    })
  }
}
