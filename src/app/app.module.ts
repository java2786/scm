import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { StockMarketModule } from './stock-market/stock-market.module';
// import { AdminModule } from './admin/admin.module';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    // CommonModule,
    // HttpClientModule,
    // BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    // AdminModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StockMarketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
