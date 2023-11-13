import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  authenticated = false;

  constructor(
    private userservice: UserServiceService
  ) {}

  ngOnInit(): void {
    const jwt = localStorage.getItem('session');
    this.userservice.useractive({jwt})
    .subscribe((res:any)=>{
      this.authenticated = true
    });
  }
}
