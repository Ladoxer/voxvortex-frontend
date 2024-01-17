import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm =  new FormGroup({
      name: new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z].*")
      ]),
      email: new FormControl("",[
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl("",[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("[0-9]*")
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ])
    })
  }

  invalid:boolean = false;
  
  get name(): FormControl{
    return this.registerForm.get("name") as FormControl;
  }
  get email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get mobile(): FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }
  get password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }

  registerSubmitted(){

    const user = this.registerForm.getRawValue();
    console.log(user);

    if(!this.registerForm.valid){
      this.invalid = true;
    }else{
      this.userservice.userRegister(user)
      .subscribe((res)=>{
        this.router.navigate(['/verify',(res as {_id:string})._id]);
      },(err)=>{
        if(err.error.message){
          this.toastr.error(err.error.message);
        }else{
          this.toastr.error("Something went wrong");
        }
      })
    }
    
  }
  
}
