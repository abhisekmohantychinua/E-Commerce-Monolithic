import {Component, Input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CartResponse} from "../../models/cart-response";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [
    JsonPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
  @Input({required: true}) cart?: CartResponse;
  protected readonly environment = environment;

  constructor(private cartService: CartService) {
  }

  plus() {
    if (this.cart && this.cart?.quantity > 0) {
      this.cart.quantity += 1
      this.updateCart()
    }
  }

  minus() {
    if (this.cart && this.cart?.quantity > 0) {
      this.cart.quantity -= 1
      this.updateCart()
    }
  }

  updateCart() {
    if (this.cart) {
      this.cartService.updateUserCartQuantity(this.cart?.id, this.cart?.quantity).subscribe((data) => {
        console.log(data)
      })
    }
  }
}
