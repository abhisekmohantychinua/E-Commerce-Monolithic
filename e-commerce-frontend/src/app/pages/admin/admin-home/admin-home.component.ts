import {Component, inject} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {ProductResponse} from "../../../models/product-response";
import {JsonPipe} from "@angular/common";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {AdminService} from "../../../services/admin.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {environment} from "../../../../environments/environment";
import {MatDividerModule} from "@angular/material/divider";
import {ProductService} from "../../../services/product.service";
import {SnackbarService} from "../../../services/util/snackbar.service";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    JsonPipe,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  query: string = ''
  searchBy: string = 'title'
  products: ProductResponse[] = []
  protected readonly environment = environment;

  private adminService: AdminService = inject(AdminService)
  private productService: ProductService = inject(ProductService)
  private snack: SnackbarService = inject(SnackbarService)

  changeQuery($event: any) {
    if ($event && $event as string !== '')
      this.updateProducts($event as string, this.searchBy)
  }

  changeSearchBy($event: any) {
    if (this.query !== '')
      this.updateProducts(this.query, $event as string)
  }

  deleteProduct(id: string) {
    this.productService.deleteProductById(id).subscribe({
      next: (data) => {
        this.products = this.products.filter(product => product.id !== id)
        this.snack.openSnack("Deleted successfully!!!");
      },
      error: (err) => {
        console.log(err)
        this.snack.openSnack(err.error.message)
      }
    })
  }

  private updateProducts(query: string, searchBy: string) {
    this.adminService.advanceSearchProduct(query, searchBy).subscribe((data) => {
      this.products = data
    })
  }
}
