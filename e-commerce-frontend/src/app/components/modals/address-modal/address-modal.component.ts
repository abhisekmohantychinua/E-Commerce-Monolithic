import {Component} from '@angular/core';
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
import {Address} from "../../../models/address";
import {UserService} from "../../../services/user.service";

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
  address: Address = {
    id: 0,
    address: '',
    city: '',
    phone: '',
    zip: ''

  }

  constructor(private dialogRef: MatDialogRef<AddressModalComponent>, private userService: UserService) {
  }


  onSubmit() {
    // const user = this.userService.fetchUser()
    // if (user?.id && this.address)
    //   this.userService.addUserAddress(user.id, this.address).subscribe((data) => {
    //     this.dialogRef.close();
    //     console.log(data)
    //   })
  }
}
