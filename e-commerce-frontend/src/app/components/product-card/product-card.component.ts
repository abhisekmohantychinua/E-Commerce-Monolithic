import {Component, inject, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ProductResponse} from "../../models/product-response";
import {environment} from "../../../environments/environment";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {CartService} from "../../services/cart.service";
import {SnackbarService} from "../../services/util/snackbar.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({required: true}) product!: ProductResponse
  protected readonly environment = environment;

  private cartService: CartService = inject(CartService)
  private snack: SnackbarService = inject(SnackbarService)

  addCart(productId: string, name: string) {
    this.cartService.addProductCart(productId).subscribe({
      next: (data) => {
        console.log(data)
        this.snack.openSnack(`${name} added to cart!!!`)
      },
      error: (err) => {
        console.log(err)
        this.snack.openSnack(err.error.message as string)
      }
    })
  }

  purchase(id: string) {
    // TODO: IMPLEMENT PURCHASE
  }
}
