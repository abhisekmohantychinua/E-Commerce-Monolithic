import {Component, OnInit} from '@angular/core';
import {OrderResponse} from "../../models/order-response";
import {OrderService} from "../../services/order.service";
import {JsonPipe} from "@angular/common";
import {MatExpansionModule} from "@angular/material/expansion";
import {environment} from "../../../environments/environment";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    JsonPipe,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  userOrders: OrderResponse[] = []
  protected readonly environment = environment;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {

  }

  deleteOrder(id: string | undefined) {

  }

  deliverOrder(id: string | undefined) {
  }
}
