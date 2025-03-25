import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PulseComponent } from './page/pulse/pulse.component';


import { AuthGuard } from './helper/guard/authentication.guard';
import { ProductsComponent } from './page/products/products.component';
import { ServicesComponent } from './page/services/services.component';
import { AuthenticationComponent } from './element/authentication/authentication.component';
import { BookingsComponent } from './page/bookings/bookings.component';
import { OrdersComponent } from './page/orders/orders.component';
import { SettingsComponent } from './page/settings/settings.component';
import { SpotComponent } from './page/spot/spot.component';
import { ProductComponent } from './page/single/product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'authenticate', component: AuthenticationComponent
  },
  { path: 'spot', component: SpotComponent , canActivate: [AuthGuard] },
  { path: '', component: PulseComponent , canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent , canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent , canActivate: [AuthGuard] },
  { path: 'product/:name', component: ProductComponent , canActivate: [AuthGuard] },
  { path: 'services', component: ServicesComponent , canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent , canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent , canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
