import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UserRequest} from "../../models/user-request";
import {MatSelectModule} from "@angular/material/select";
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";

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

  onSubmit() {
    console.log(this.userRequest)
    // TODO: implement register
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
