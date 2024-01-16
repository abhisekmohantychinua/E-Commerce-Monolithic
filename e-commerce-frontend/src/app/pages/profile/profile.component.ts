import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserResponse} from "../../models/user-response";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {AddressModalComponent} from "../../components/modals/address-modal/address-modal.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user?: UserResponse

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  logout() {

  }

  deleteAddress(id: number | undefined) {

  }

  addAddress() {
    this.dialog.open(AddressModalComponent, {
      height: '400px',
      width: '600px'
    })
  }
}
