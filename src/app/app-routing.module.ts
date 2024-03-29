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
import { PublishComponent } from './components/User/publish/publish.component';
import { AdminLoginComponent } from './components/Admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/Admin/admin-home/admin-home.component';
import { AdminUserComponent } from './components/Admin/admin-user/admin-user.component';
import { AdminGuard, AdminGuardlet } from './components/Guards/admin.guard';
import { AdminLabelComponent } from './components/Admin/admin-label/admin-label.component';
import { ChatComponent } from './components/User/chat/chat.component';
import { ConfirmationGuard } from './components/Guards/confirmation.guard';
import { LabelBlogComponent } from './components/User/label-blog/label-blog.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { MyBlogsComponent } from './components/User/profile/components/my-blogs/my-blogs.component';
import { SavedBlogsComponent } from './components/User/profile/components/saved-blogs/saved-blogs.component';
import { AdminPlanComponent } from './components/Admin/admin-plan/admin-plan.component';
import { UpgradeComponent } from './components/User/upgrade/upgrade.component';
import { premiumGuard, premiumGuardlet } from './components/Guards/premium.guard';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent,canActivate:[userGuard]},
  {path:'login', component:LoginComponent, canActivate:[userGuard]},
  {path:'verify/:id',component:OtpComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'write',component:WriteContentComponent,canActivate:[UserGuardlet]},
  {path:'renewpassword/:token',component:RenewpasswordComponent},
  {path:'detailpage/:id', component:DetailPageComponent},
  {path:'publish', component:PublishComponent, canDeactivate: [ConfirmationGuard]},
  {path:'admin/login', component:AdminLoginComponent, canActivate:[AdminGuardlet]},
  {path:'admin', component: AdminHomeComponent, canActivate:[AdminGuard], children:[
    {path:'', redirectTo:'/admin/dashboard', pathMatch:'full'},
    {path:'dashboard', component: AdminDashboardComponent},
    {path:'users', component: AdminUserComponent},
    {path:'label', component: AdminLabelComponent},
    {path:'plan', component: AdminPlanComponent}
  ]},
  {path:'chat', component:ChatComponent, canActivate:[UserGuardlet, premiumGuard]},
  {path:'topic/:id', component: LabelBlogComponent},
  {path:'profile', component: ProfileComponent, canActivate:[UserGuardlet], children:[
    {path:'', redirectTo: '/profile/blog-list', pathMatch: 'full'},
    {path:'blog-list', component: MyBlogsComponent},
    {path:'saved', component: SavedBlogsComponent}
  ]},
  {path:'upgrade', component: UpgradeComponent, canActivate:[UserGuardlet, premiumGuardlet]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
