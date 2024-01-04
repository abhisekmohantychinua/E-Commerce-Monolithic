import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userId: string = '';

  constructor(private thisDialog: MatDialogRef<LoginComponent>, private userService: UserService, private location: Location) {
  }

  ngOnInit(): void {
    if (this.userService.fetchUser() != null) {
      this.thisDialog.close();
    }
  }


  onSubmit() {
    this.userService.getUserByUserId(this.userId).subscribe({
      next: (data) => {
        this.userService.storeUser(data)
        this.location.back()
      }, error: (error) => {
        console.log(error)
      }
    })
  }
}
