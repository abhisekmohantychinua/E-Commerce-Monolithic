import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SearchComponent} from "./pages/search/search.component";
import {CartsComponent} from "./pages/carts/carts.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {ProfileComponent} from "./pages/profile/profile.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'search',component:SearchComponent, pathMatch:"full"},
  {path:'carts',component: CartsComponent,pathMatch:"full"},
  {path:'orders',component: OrdersComponent,pathMatch:"full"},
  {path:'profile',component: ProfileComponent,pathMatch:"full"},
];
