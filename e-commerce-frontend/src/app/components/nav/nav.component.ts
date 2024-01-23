import {Component, inject, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Roles} from "../../models/roles";


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  isAdmin: Roles
  private authService: AuthService = inject(AuthService)

  ngOnInit(): void {
    this.authService.userRole$.subscribe((userRole) => {
      this.isAdmin = userRole
    })
  }


}
