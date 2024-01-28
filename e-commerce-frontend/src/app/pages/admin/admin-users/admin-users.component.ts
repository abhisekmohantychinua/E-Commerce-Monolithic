import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {UserResponse} from "../../../models/user-response";
import {JsonPipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {AddressCardComponent} from "../../../components/address-card/address-card.component";
import {SnackbarService} from "../../../services/util/snackbar.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    JsonPipe,
    MatCardModule,
    MatListModule,
    MatIconModule,
    AddressCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  users: UserResponse[] = [];
  userId: string = ''
  private adminService: AdminService = inject(AdminService)
  private snack: SnackbarService = inject(SnackbarService)

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe(data => this.users = data)
  }

  deleteUserAddress($event: number) {
    this.adminService.deleteAddressById($event).subscribe({
      next: (data) => {
        this.snack.openSnack("Deleted Address Success!!!")
      },
      error: (err) => {
        console.log(err)
        this.snack.openSnack(err.error.message)
      }
    })
  }

  clearId() {
    this.userId = ''
    this.adminService.getAllUser().subscribe(data => this.users = data)
  }

  searchUser() {
    this.adminService.getUserById(this.userId).subscribe((data) => {
      const arr: UserResponse[] = []
      arr.push(data)
      this.users = arr;
    })
  }

  deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe({
      next: (data) => {
        this.users = this.users.filter(user => user.id !== id)
        this.snack.openSnack("Deleted successfully!!!")
      },
      error: (err) => {
        console.log(err)
        this.snack.openSnack(err.error.message)
      }
    })
  }
}
