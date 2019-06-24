import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{path:'',redirectTo:'navbar', pathMatch:'full'},
{path:'navbar',component:NavbarComponent,
children:[{path:'',redirectTo:'login',pathMatch:'full'},
          {path:'login',component:LoginComponent},
          {path:'orders',component:OrdersComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
