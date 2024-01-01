import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../models/product-response";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    MatCheckboxModule,
    MatButtonModule
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
  categories: string[] = ["ELECTRONICS", "FASHION", "BEAUTY", "GROCERY", "ACCESSORIES"]
  selectedIndex = -1;


  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.fetchProductByPageNo().subscribe((data) => {
      this.products = data
    })
  }

  loadMoreProduct(): void {
    this.pageNo++;
    this.productService.fetchProductByPageNo(this.pageNo).subscribe((data) => {
      this.products = this.products.concat(data);
      if (data.length === 0) {
        this.pageNo = -1
      }
    })
  }


  selectFilter($index: number) {
    if (this.selectedIndex != $index) {
      this.selectedIndex = $index
      this.pageNo = -1;
      this.productService.fetchProductByCategory(this.categories[this.selectedIndex]).subscribe((data) => {
        this.products = data
      })
    }
  }

  clearFilter() {
    this.pageNo = 0
    this.selectedIndex = -1;
    this.ngOnInit()
  }
}
