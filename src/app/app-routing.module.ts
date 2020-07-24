import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  // {path: 'stock-market', loadChildren: './stock-market/stock-market.module#StockMarketModule'},
  {path: 'stock-market', loadChildren: './stock-market/stock-market.module#StockMarketModule', canActivate: [LoginGuard]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [LoginGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
