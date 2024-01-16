import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../models/product-response";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {KeyValuePipe} from "@angular/common";
import {Categories} from "../../models/categories";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    MatCheckboxModule,
    MatButtonModule,
    KeyValuePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: {clickAction: 'noop'} as MatCheckboxDefaultOptions}
  ]
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = []
  pageNo: number = 0;
  selectedCategory?: Categories
  categories: Categories[] = ["ELECTRONICS", "FASHION", "BEAUTY", "GROCERY", "ACCESSORIES"]

  constructor(private productService: ProductService, private cartService: CartService, private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data
    })
  }

  loadMoreProduct(): void {
    this.pageNo++;
    this.productService.getAllProducts(this.pageNo).subscribe((data) => {
      this.products = this.products.concat(data);
      if (data.length === 0) {
        this.pageNo = -1
      }
    })
  }

  selectFilter(category: Categories) {
    if (this.selectedCategory != category) {
      this.selectedCategory = category
      this.pageNo = -1;
      this.productService.getAllProducts(undefined, category).subscribe((data) => {
        this.products = data
      })
    }
  }

  clearFilter() {
    this.pageNo = 0
    this.selectedCategory = undefined;
    this.ngOnInit()
  }


}
