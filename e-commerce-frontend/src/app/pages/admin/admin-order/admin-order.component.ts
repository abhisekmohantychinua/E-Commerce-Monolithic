import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {OrderResponse} from "../../../models/order-response";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {environment} from "../../../../environments/environment";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css'
})
export class AdminOrderComponent implements OnInit {
  orders: OrderResponse[] = []
  searchBy: 'userId' | 'orderId' = 'userId'
  someId: string = ''
  protected readonly environment = environment;
  private adminService: AdminService = inject(AdminService)

  ngOnInit(): void {
    this.adminService.getAllOrder().subscribe((data) => this.orders = data)
  }

  searchOrder() {
    if (this.searchBy === 'userId' && this.someId !== '') {
      this.adminService.getAllUserOrder(this.someId).subscribe((data) => {
        this.orders = data
      })
    } else if (this.searchBy === 'orderId' && this.someId !== '') {
      this.adminService.getOrderById(this.someId).subscribe((data) => {
        let arr: OrderResponse[] = []
        arr.push(data)
        this.orders = arr
      })
    }
  }
}
