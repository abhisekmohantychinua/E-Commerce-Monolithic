import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Address} from "../../models/address";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.css'
})
export class AddressCardComponent {
  @Input({required: true}) address!: Address;
  @Output() deleteAddressEmitter: EventEmitter<number> = new EventEmitter<number>()

  deleteAddress() {
    this.deleteAddressEmitter.emit(this.address.id)
  }
}
