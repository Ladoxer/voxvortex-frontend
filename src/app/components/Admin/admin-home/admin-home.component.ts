import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  isSidebarOpen: boolean = false;

  constructor(private router: Router){}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout(){
    localStorage.removeItem('adminsession');

    this.router.navigate(['/admin/login']);
  }
}
