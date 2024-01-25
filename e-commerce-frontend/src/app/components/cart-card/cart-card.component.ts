import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CartResponse} from "../../models/cart-response";
import {CartService} from "../../services/cart.service";
import {MatDialog} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [
    JsonPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
  @Input({required: true}) cart!: CartResponse;
  @Output() emitter: EventEmitter<number> = new EventEmitter<number>()
  protected readonly environment = environment;

  private cartService: CartService = inject(CartService)
  private dialog: MatDialog = inject(MatDialog)


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
      this.cartService.updateUserCartProductQuantity(this.cart.id, this.cart.quantity).subscribe((data) => {
        console.log(data)
      })
    }
  }

  deleteCart(id: number | undefined) {
    if (id)
      this.emitter.emit(id)
  }

  purchase() {
    // TODO: IMPLEMENT PURCHASE
    // if (this.cart?.product?.id)
    //   this.dialog.open(OrderModalComponent, {
    //     data: {
    //       prodId: this.cart.product.id,
    //       quantity: this.cart.quantity
    //     }
    //   })
  }
}
