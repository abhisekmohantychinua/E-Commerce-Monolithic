import {Component, inject, OnInit} from '@angular/core';
import {OrderResponse} from "../../models/order-response";
import {OrderService} from "../../services/order.service";
import {JsonPipe} from "@angular/common";
import {MatExpansionModule} from "@angular/material/expansion";
import {environment} from "../../../environments/environment";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {SnackbarService} from "../../services/util/snackbar.service";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    JsonPipe,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  userOrders: OrderResponse[] = []
  protected readonly environment = environment;

  private orderService: OrderService = inject(OrderService)
  private snack: SnackbarService = inject(SnackbarService)

  ngOnInit(): void {
    this.orderService.getAllUserOrder().subscribe((data) => {
      this.userOrders = data
    })
  }

  deleteOrder(id: string) {
    this.orderService.cancelOrder(id).subscribe((data) => {
      this.userOrders = this.userOrders.filter(order => order.id !== id)
      this.snack.openSnack("Cancelled Order!!!")
    })
  }

  deliverOrder(id: string) {
    this.orderService.deliverOrder(id).subscribe((data) => {
      this.userOrders = this.userOrders.map(order => {
        if (order.id === id) {
          order.status = "DELIVERED"
        }
        return order;
      })
      this.snack.openSnack("Delivered Successfully!!!")
    })
  }
}
