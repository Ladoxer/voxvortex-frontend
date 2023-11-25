import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  Users = [];

  constructor(
    private adminService: AdminServiceService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((users) => {
      this.Users = users;
    })
  }

  onAction(blocked: boolean,index: number,id){
    if(blocked){
      this.Users[index].is_blocked = false;
      this.adminService.unBlockUser(id).subscribe((data)=>{
        this.toastr.info(`${this.Users[index].name} is Unblocked`);
      })
    }else{
      this.Users[index].is_blocked = true;
      this.adminService.blockUser(id).subscribe((data)=>{
        this.toastr.info(`${this.Users[index].name} is Blocked`);
      })
    }
  }
}
