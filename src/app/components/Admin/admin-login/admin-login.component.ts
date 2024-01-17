import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  hide = true;

  constructor(
    private route: Router,
    private toastr: ToastrService,
    private adminservice: AdminService
  ){}

  loginForm!: FormGroup;
  jwt!: string|null;

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

    this.jwt = localStorage.getItem('adminsession');
  }

  invalid: boolean = false;

  loginSubmit(){

    const user = this.loginForm.getRawValue();
    
    if(!this.loginForm.valid){
      this.invalid = true
    }else{
      this.adminservice.adminLogin(user)
      .subscribe((res)=>{
        localStorage.setItem('adminsession',res.toString())
        this.route.navigate(['/admin/dashboard']);
      }
      ,(err)=>{
        this.toastr.error(err.error.message);
      }
      )
    }
  }

  get email(): FormControl{
    return this.loginForm.get("email") as FormControl
  }
  get password(): FormControl{
    return this.loginForm.get("password") as FormControl
  }
}
