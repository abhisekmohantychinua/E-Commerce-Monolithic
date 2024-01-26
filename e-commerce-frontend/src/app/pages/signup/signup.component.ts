import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UserRequest} from "../../models/user-request";
import {MatSelectModule} from "@angular/material/select";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {SnackbarService} from "../../services/util/snackbar.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userRequest: UserRequest = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    role: undefined
  }
  usernameHint: string = ''
  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)
  private snack: SnackbarService = inject(SnackbarService)

  onSubmit() {
    console.log(this.userRequest)
    this.authService.register(this.userRequest).subscribe({
      next: (data) => {
        console.log(data)
        this.snack.openSnack("Account Created Successfully!!!")
        this.router.navigateByUrl('/signin')
      },
      error: (err) => {
        console.log(err)
        this.snack.openSnack(err.error.message)
        this.router.navigateByUrl('/signin')
      }
    })
  }


  onUsernameChange($event: any) {
    this.authService.verify($event).subscribe((data: boolean) => {
      if (data) {
        this.usernameHint = ''
      } else {
        this.usernameHint = 'Not Available'
      }
    })
  }
}
