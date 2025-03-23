import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './element/authentication/authentication.component';

import { HeaderComponent } from './organism/header/header.component';
import { SidebarComponent } from './organism/sidebar/sidebar.component';

import { ChatBoxComponent } from './molecule/chat-box/chat-box.component';

import { SpotComponent } from './page/spot/spot.component';
import { PulseComponent } from './page/pulse/pulse.component';
import { OrdersComponent } from './page/orders/orders.component';
import { ProductsComponent } from './page/products/products.component';
import { ServicesComponent } from './page/services/services.component';
import { BookingsComponent } from './page/bookings/bookings.component';
import { ArticlesComponent } from './page/articles/articles.component';
import { SettingsComponent } from './page/settings/settings.component';
import { TutorialsComponent } from './page/tutorials/tutorials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AddModalComponent } from './molecule/add-modal/add-modal.component';
import { ProductComponent } from './page/single/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    SpotComponent,
    PulseComponent,
    HeaderComponent,
    OrdersComponent,
    SidebarComponent,
    ChatBoxComponent,
    ServicesComponent,
    ProductComponent,
    ProductsComponent,
    BookingsComponent,
    ArticlesComponent,
    SettingsComponent,
    TutorialsComponent,
    AddModalComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot({}),
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
