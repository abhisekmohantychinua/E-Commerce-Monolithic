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

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'signin', component: SigninComponent, pathMatch: "full", canActivate: [noAuthGuard]},
  {path: 'signup', component: SignupComponent, pathMatch: "full", canActivate: [noAuthGuard]},
  {
    path: 'user',
    children: [
      {path: 'profile', component: ProfileComponent, pathMatch: "full"},
      {path: 'cart', component: CartsComponent, pathMatch: "full"},
      {path: 'orders', component: CartsComponent, pathMatch: "full"}
    ],
    canActivateChild: [authGuard]

  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [],
    canActivate: [authGuard, adminGuard],
    canActivateChild: [authGuard, adminGuard]
  }
];
