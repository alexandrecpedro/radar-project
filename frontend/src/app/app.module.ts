import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';

import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CashFlowComponent } from './pages/cash-flow/cash-flow.component';
<<<<<<< HEAD
import { LoginComponent } from './pages/login/login.component';
=======
>>>>>>> fa3fe7c877c6a65d1ae4a255cf257ae212a84bcc
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent, 
    ProductsComponent,
    OrdersComponent,
    ClientsComponent,
    CashFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
=======
    HttpClientModule,
>>>>>>> fa3fe7c877c6a65d1ae4a255cf257ae212a84bcc
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
