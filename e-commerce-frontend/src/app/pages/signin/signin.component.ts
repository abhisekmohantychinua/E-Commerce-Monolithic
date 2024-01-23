import {Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {AuthRequest} from "../../models/auth-request";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AuthResponse} from "../../models/auth-response";
import {SnackbarService} from "../../services/util/snackbar.service";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  authRequest: AuthRequest = {
    username: '',
    password: ''
  }
  private authService: AuthService = inject(AuthService)
  private snack: SnackbarService = inject(SnackbarService)
  private router: Router = inject(Router)

  onSubmit() {
    this.authService.login(this.authRequest).subscribe({
      next: (data: AuthResponse) => {
        this.snack.openSnack('Logged in successfully!!!')
        this.router.navigateByUrl('/')
      },
      error: (err: any) => {
        this.snack.openSnack(err.error.message);
        console.log(err.error.message)
        this.router.navigateByUrl('/signin')
      }
    })
  }
}
