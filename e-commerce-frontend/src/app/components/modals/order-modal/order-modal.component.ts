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
import {OrderService} from "../../../services/order.service";
import {UserService} from "../../../services/user.service";
import {Address} from "../../../models/address";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";


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
    RouterLink
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.css'
})
export class OrderModalComponent {
  quantity: number = 1
  addresses: Address[] = []
  selectedIndex: number = -1

  constructor(
    public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { prodId: string, quantity?: number },
    private orderService: OrderService,
    private userService: UserService
  ) {
    if (this.data.quantity) {
      this.quantity = this.data.quantity
    }
    const user = this.userService.fetchUser()
    if (user?.id)
      this.userService.getAllUserAddress(user.id).subscribe((data) => {
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
    const user = this.userService.fetchUser()
    const address = this.addresses[this.selectedIndex]
    if (user?.id && address.id)
      this.orderService.createOrder(user.id, this.data.prodId, this.quantity, address.id).subscribe((data) => {
        console.log(data)
        this.dialogRef.close()
      })
  }

  select($index: number) {
    this.selectedIndex = $index
  }
}
