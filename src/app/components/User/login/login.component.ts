import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  jwt!: string | null;
  hide = true;

  constructor(
    private route: Router,
    private toastr: ToastrService,
    private userservice: UserServiceService
  ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("",[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("",[
        Validators.required
      ])
    })

    this.jwt = localStorage.getItem('session');
  }

  invalid: boolean = false;

  loginSubmit(){
    const user = this.loginForm.getRawValue();
    console.log(user);

    if(!this.loginForm.valid){
      this.invalid = true;
    }else{
      this.userservice.userLogin(user)
      .subscribe((res)=>{
        localStorage.setItem('session',res.token.toString())
        localStorage.setItem('userData',res.userData);
        this.route.navigate(['/']);
      },(err)=>{
        if(err.error.message=="User not verified"){
          this.toastr.error("User not verified");
          this.userservice.userReverification(user)
          .subscribe((result)=>{
            this.route.navigate(['/verify',(result as {_id:string})._id]);
            this.toastr.success("Mail send for verification, please verify your email");
          },(err)=>{
            if(err.error.message){
              this.toastr.error(err.error.message);
            }else{
              this.toastr.error("Something went wrong");
            }
          })
        }else if(err.error.message){
          this.toastr.error(err.error.message);
        }else{
          this.toastr.error("Something went wrong");
        }
      })
    }
  }

  get email(): FormControl{
    return this.loginForm.get("email") as FormControl
  }
  get password(): FormControl{
    return this.loginForm.get("password") as FormControl
  }
}
