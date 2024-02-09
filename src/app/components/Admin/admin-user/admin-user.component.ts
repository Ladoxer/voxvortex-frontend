import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  Users = [];

  itemsPerPage = 6;
  currentPage = 1;

  constructor(
    private adminService: AdminService,
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

  // pagination
  get paginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.Users.slice(startIndex, endIndex);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.Users.length / this.itemsPerPage))
      .fill(0)
      .map((_, index) => index + 1);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
