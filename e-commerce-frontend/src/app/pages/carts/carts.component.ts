import {Component, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CartService} from "../../services/cart.service";
import {CartResponse} from "../../models/cart-response";
import {CartCardComponent} from "../../components/cart-card/cart-card.component";
import {UserService} from "../../services/user.service";

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

  constructor(private cartService: CartService, private userService: UserService) {
  }

  ngOnInit(): void {
    // const user = this.userService.fetchUser()
    // if (user && user.id) {
    //   this.cartService.getUserCart(user.id).subscribe((data) => {
    //     this.userCarts = data
    //   })
    // }
  }


  removeCart(cartId: number) {
    // const user = this.userService.fetchUser()
    // if (user?.id && cartId)
    //   this.cartService.removeCart(user.id, cartId).subscribe((data) => {
    //     this.userCarts = this.userCarts.filter(cart => cart.id != cartId)
    //   })
  }
}
