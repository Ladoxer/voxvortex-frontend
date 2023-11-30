import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';

// material ui
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

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
import { WriteContentComponent } from './components/User/write-content/write-content.component';
import { DetailPageComponent } from './components/User/detail-page/detail-page.component';
import { PublishComponent } from './components/User/publish/publish.component';
import { BlogCardComponent } from './components/User/home/components/blog-card/blog-card.component';
import { AdminLoginComponent } from './components/Admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/Admin/admin-home/admin-home.component';
import { AdminUserComponent } from './components/Admin/admin-user/admin-user.component';
import { AdminLabelComponent } from './components/Admin/admin-label/admin-label.component';
import { ChatComponent } from './components/User/chat/chat.component';
import { ConversationComponent } from './components/User/chat/components/conversation/conversation.component';
import { ChatAreaComponent } from './components/User/chat/components/chat-area/chat-area.component';
import { EmptyChatComponent } from './components/User/chat/components/empty-chat/empty-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UsernavComponent,
    OtpComponent,
    ForgotpasswordComponent,
    RenewpasswordComponent,
    WriteContentComponent,
    DetailPageComponent,
    PublishComponent,
    BlogCardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminUserComponent,
    AdminLabelComponent,
    ChatComponent,
    ConversationComponent,
    ChatAreaComponent,
    EmptyChatComponent,
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
    MatTabsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
