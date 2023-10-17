import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// material ui
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';

// prime ng
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from "primeng/divider";
import { InputTextModule } from 'primeng/inputtext'; 
// ----


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/User/register/register.component';
import { LoginComponent } from './components/User/login/login.component';
import { HomeComponent } from './components/User/home/home.component';
import { UsernavComponent } from './components/User/usernav/usernav.component';
import { OtpComponent } from './components/User/otp/otp.component';
import { ForgotpasswordComponent } from './components/User/forgotpassword/forgotpassword.component';
import { RenewpasswordComponent } from './components/User/renewpassword/renewpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UsernavComponent,
    OtpComponent,
    ForgotpasswordComponent,
    RenewpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
