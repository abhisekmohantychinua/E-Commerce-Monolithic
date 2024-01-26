import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserResponse} from "../../models/user-response";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {AddressModalComponent} from "../../components/address-modal/address-modal.component";
import {AuthService} from "../../services/auth.service";
import {AddressCardComponent} from "../../components/address-card/address-card.component";
import {SnackbarService} from "../../services/util/snackbar.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    AddressCardComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: UserResponse = {
    id: '',
    username: '',
    phone: '',
    name: '',
    addresses: [],
    email: '',
    password: '',
    role: ''

  }

  private authService: AuthService = inject(AuthService)
  private userService: UserService = inject(UserService)
  private dialog: MatDialog = inject(MatDialog)
  private snack: SnackbarService = inject(SnackbarService)

  ngOnInit(): void {
    this.userService.getAuthUser().subscribe((data) => {
      this.user = data
    })
  }

  logout() {
    this.authService.logout();
  }

  deleteAddress(id: number) {
    this.userService.deleteAddress(id).subscribe({
      next: (data) => {
        this.user.addresses = this.user.addresses.filter(address => address.id !== id)
        this.snack.openSnack("Address deleted!!!")
      },
      error: (err) => {
        console.log(err)
        this.snack.openSnack(err.error.message)
      }
    })
  }

  addAddress() {
    this.dialog.open(AddressModalComponent, {
      height: '500px',
      width: '600px',

    })
  }
}
