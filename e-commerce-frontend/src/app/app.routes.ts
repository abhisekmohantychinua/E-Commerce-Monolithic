import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {CartsComponent} from "./pages/carts/carts.component";
import {AdminLayoutComponent} from "./pages/admin/admin-layout/admin-layout.component";
import {authGuard} from "./guards/auth.guard";
import {adminGuard} from "./guards/admin.guard";
import {SigninComponent} from "./pages/signin/signin.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {noAuthGuard} from "./guards/no-auth.guard";
import {OrdersComponent} from "./pages/orders/orders.component";
import {AdminHomeComponent} from "./pages/admin/admin-home/admin-home.component";
import {AdminUsersComponent} from "./pages/admin/admin-users/admin-users.component";
import {AdminOrderComponent} from "./pages/admin/admin-order/admin-order.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'signin', component: SigninComponent, pathMatch: "full", canActivate: [noAuthGuard]},
  {path: 'signup', component: SignupComponent, pathMatch: "full", canActivate: [noAuthGuard]},
  {
    path: 'user',
    children: [
      {path: 'profile', component: ProfileComponent, pathMatch: "full"},
      {path: 'cart', component: CartsComponent, pathMatch: "full"},
      {path: 'orders', component: OrdersComponent, pathMatch: "full"}
    ],
    canActivateChild: [authGuard]

  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {path: '', component: AdminHomeComponent, pathMatch: "full"},
      {path: 'users', component: AdminUsersComponent, pathMatch: "full"},
      {path: 'orders', component: AdminOrderComponent, pathMatch: "full"},
      // {path: 'address', component: AdminAddressComponent, pathMatch: "full"}
    ],
    canActivate: [authGuard, adminGuard],
    canActivateChild: [authGuard, adminGuard]
  }
];
