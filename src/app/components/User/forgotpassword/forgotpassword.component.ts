import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  invalid: boolean = false;
  verificationForm!: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userservice: UserService
  ){}

  ngOnInit(): void {
    this.verificationForm = new FormGroup({
      verification: new FormControl("",[
        Validators.required,
        Validators.email
      ])
    })
  }

  get verification(): FormControl{
    return this.verificationForm.get("verification") as FormControl;
  }

  verificationSubmit(){
    const email = this.verificationForm.getRawValue();

    if(!this.verificationForm.valid){
      this.invalid = true;
    }else{
      this.userservice.forgotPassword(email)
      .subscribe(()=>{
        this.toastr.success("Email for forgot password has send to your email.");
        this.router.navigate(['/login']);
      },(err)=>{
        this.toastr.error("Something went wrong");
      })
    }
  }
}
