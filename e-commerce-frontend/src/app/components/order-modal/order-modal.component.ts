import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {OrderService} from "../../services/order.service";
import {UserService} from "../../services/user.service";
import {Address} from "../../models/address";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProductResponse} from "../../models/product-response";
import {environment} from "../../../environments/environment";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {OrderRequest} from "../../models/order-request";
import {SnackbarService} from "../../services/util/snackbar.service";


@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    NgClass,
    RouterLink,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.css'
})
export class OrderModalComponent {
  quantity: number = 1
  addresses: Address[] = []
  selectedIndex: number = -1
  protected readonly environment = environment;

  constructor(
    public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: ProductResponse, quantity?: number },
    private orderService: OrderService,
    private userService: UserService,
    private snack: SnackbarService
  ) {
    if (this.data.quantity) {
      this.quantity = this.data.quantity
    }
    this.userService.getAuthUserAddress().subscribe((data) => {
      this.addresses = data
    })
  }

  plus() {
    this.quantity += 1;
  }

  minus() {
    if (this.quantity > 1)
      this.quantity -= 1;
  }

  createOrder() {
    const address = this.addresses[this.selectedIndex]
    const orderRequest: OrderRequest = {
      quantity: this.quantity,
      addressId: address.id,
      productId: this.data.product.id
    }
    console.log(orderRequest)
    if (address.id)
      this.orderService.createOrder(orderRequest).subscribe((data) => {
        console.log(data)
        this.dialogRef.close()
        this.snack.openSnack("Order created!!!")
      })
  }

  select($index: number) {
    this.selectedIndex = $index
  }
}
