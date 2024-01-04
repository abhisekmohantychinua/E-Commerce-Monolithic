import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SearchComponent} from "./pages/search/search.component";
import {CartsComponent} from "./pages/carts/carts.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {LoginComponent} from "./pages/login/login.component";
import {userGuard} from "./guards/user.guard";

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'login', component: LoginComponent, pathMatch: "full"},
  {path: 'search', component: SearchComponent, pathMatch: "full"},
  {path: 'carts', component: CartsComponent, pathMatch: "full", canActivate: [userGuard]},
  {path: 'orders', component: OrdersComponent, pathMatch: "full", canActivate: [userGuard]},
  {path: 'profile', component: ProfileComponent, pathMatch: "full", canActivate: [userGuard]},
];
