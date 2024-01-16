import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userId: string = ''

  constructor(private authService: AuthService, private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  onSubmit() {

  }
}
