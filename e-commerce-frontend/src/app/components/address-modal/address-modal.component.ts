import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {UserService} from "../../services/user.service";
import {AddressRequest} from "../../models/address-request";
import {SnackbarService} from "../../services/util/snackbar.service";

@Component({
  selector: 'app-address-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatInputModule
  ],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.css'
})
export class AddressModalComponent {
  address: AddressRequest = {
    address: '',
    city: '',
    phone: '',
    zip: ''

  }
  private dialogRef: MatDialogRef<AddressModalComponent> = inject(MatDialogRef<AddressModalComponent>)
  private userService: UserService = inject(UserService)
  private snack: SnackbarService = inject(SnackbarService)

  validateFields = () => {
    return this.address.address !== '' &&
      this.address.city !== '' &&
      this.address.phone !== '' &&
      this.address.phone.length <= 10 &&
      this.address.zip !== '' &&
      this.address.zip.length <= 6;

  }

  onSubmit() {
    this.userService.addAuthUserAddress(this.address).subscribe({
      next: (data) => {
        console.log(data)
        this.snack.openSnack("Added Successfully!!!")
        this.dialogRef.close()
      },
      error: (err) => {
        console.log(err)
        this.snack.openSnack(err.error.message)
        this.dialogRef.close()
      }
    })
  }
}
