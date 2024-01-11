import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ProductResponse} from "../../models/product-response";
import {environment} from "../../../environments/environment";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";

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
  @Input({required: true}) product?: ProductResponse
  @Output() cartEmitter: EventEmitter<string> = new EventEmitter<string>()
  @Output() purchaseEmitter: EventEmitter<string> = new EventEmitter<string>()
  protected readonly environment = environment;


  addCart(productId?: string) {
    if (productId)
      this.cartEmitter.emit(productId)
  }

  purchase(productId?: string) {
    if (productId)
      this.purchaseEmitter.emit(productId)
  }

}
