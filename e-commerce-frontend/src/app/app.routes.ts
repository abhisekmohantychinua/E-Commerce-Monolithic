import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {CartsComponent} from "./pages/carts/carts.component";
import {AdminLayoutComponent} from "./pages/admin/admin-layout/admin-layout.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {
    path: 'user',
    children: [
      {path: 'profile', component: ProfileComponent, pathMatch: "full"},
      {path: 'cart', component: CartsComponent, pathMatch: "full"},
      {path: 'orders', component: CartsComponent, pathMatch: "full"}
    ]

  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: []
  }
];
