import {Component, inject, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Roles} from "../../models/roles";
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "../add-product/add-product.component";


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
  private dialog: MatDialog = inject(MatDialog)
  private router: Router = inject(Router)


  ngOnInit(): void {
    this.router.events.subscribe((route) => {
      this.isAdmin = this.authService.getUserRole();
    })
  }


  openAddProductModal() {
    this.dialog.open(AddProductComponent);
  }
}
