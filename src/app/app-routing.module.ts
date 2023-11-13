import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/User/home/home.component';
import { RegisterComponent } from './components/User/register/register.component';
import { LoginComponent } from './components/User/login/login.component';
import { OtpComponent } from './components/User/otp/otp.component';
import { ForgotpasswordComponent } from './components/User/forgotpassword/forgotpassword.component';
import { WriteContentComponent } from './components/User/write-content/write-content.component';
import { RenewpasswordComponent } from './components/User/renewpassword/renewpassword.component';
import { UserGuardlet, userGuard } from './components/Guards/user-guard.guard';
import { DetailPageComponent } from './components/User/detail-page/detail-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent,canActivate:[userGuard]},
  {path:'login', component:LoginComponent, canActivate:[userGuard]},
  {path:'verify/:id',component:OtpComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'write',component:WriteContentComponent,canActivate:[UserGuardlet]},
  {path:'renewpassword/:token',component:RenewpasswordComponent},
  {path:'detailpage', component:DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
