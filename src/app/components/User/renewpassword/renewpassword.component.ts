import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-renewpassword',
  templateUrl: './renewpassword.component.html',
  styleUrls: ['./renewpassword.component.css']
})
export class RenewpasswordComponent implements OnInit {

  invalid: boolean = false;
  verificationForm!: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.verificationForm = new FormGroup({
      verification: new FormControl("",[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6)
      ])
    })
  }

  get verification(): FormControl{
    return this.verificationForm.get("verification") as FormControl
  }

  verificationSubmit(){

    const password = this.verificationForm.getRawValue();
    let token = this.route.snapshot.paramMap.get('token');

    if(!this.verificationForm.valid){
      this.invalid = true;
    }else{
      this.userservice.forgot(token,password)
      .subscribe(()=>{
        this.toastr.success("Your Password Changed Successfully.");
        this.router.navigate(['/login']);
      },(err)=>{
        this.toastr.error("Something went wrong");
      })
    }
  }

}
