import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent as LoginDialog} from "../../components/login/login.component";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private dialog: MatDialog, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.userService.fetchUser() == null) {
      this.dialog.open(LoginDialog, {
        height: '400px',
        width: '600px'
      })
    } else {
      this.router.navigate(['/'])
    }

  }
}
