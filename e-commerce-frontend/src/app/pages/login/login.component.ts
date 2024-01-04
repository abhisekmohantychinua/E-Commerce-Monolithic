import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

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

  constructor(private userService: UserService, private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    if (this.userService.fetchUser()) {
      this.router.navigate(['/'])
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
