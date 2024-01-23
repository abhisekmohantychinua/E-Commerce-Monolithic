import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserResponse} from "../../models/user-response";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {AddressModalComponent} from "../../components/modals/address-modal/address-modal.component";
import {AuthService} from "../../services/auth.service";

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

  private authService: AuthService = inject(AuthService)
  private userService: UserService = inject(UserService)
  private dialog: MatDialog = inject(MatDialog)

  ngOnInit(): void {
    this.userService.getAuthUser().subscribe((data) => {
      this.user = data
    })
  }

  logout() {
    this.authService.logout();
  }

  deleteAddress(id: number | undefined) {
    if (id)
      this.userService.deleteAddress(id)
  }

  addAddress() {
    this.dialog.open(AddressModalComponent, {
      height: '400px',
      width: '600px'
    })
  }
}
