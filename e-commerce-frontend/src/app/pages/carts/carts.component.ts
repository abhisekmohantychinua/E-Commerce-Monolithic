import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CartService} from "../../services/cart.service";
import {CartResponse} from "../../models/cart-response";
import {CartCardComponent} from "../../components/cart-card/cart-card.component";

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CartCardComponent
  ],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  userCarts: CartResponse[] = []

  private cartService: CartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.getAllCartOfUser().subscribe((data) => {
      this.userCarts = data
    })
  }


  removeCart(cartId: number) {
    this.cartService.removeCart(cartId).subscribe((data) => {
      this.userCarts = this.userCarts.filter(cart => cart.id !== cartId);
    })
  }
}
