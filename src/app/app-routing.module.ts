import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/User/home/home.component';
import { RegisterComponent } from './components/User/register/register.component';
import { LoginComponent } from './components/User/login/login.component';
import { OtpComponent } from './components/User/otp/otp.component';
import { ForgotpasswordComponent } from './components/User/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'verify/:id',component:OtpComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
