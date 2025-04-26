import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.css']
})
export class ListModalComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() userData: any[] = [];
  @Input() canFollow: boolean = true;
  
  searchTerm: string = '';
  currentUserId: string = '';
  followingIds: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userData') || '';
    this.loadFollowingStatus();
  }

  // Load the current user's following list
  loadFollowingStatus(): void {
    if (!this.currentUserId) return;
    
    this.userService.getUser(this.currentUserId).subscribe(
      (userData) => {
        if (userData && userData.following) {
          this.followingIds = userData.following.map(user => 
            typeof user === 'string' ? user : user._id
          );
        }
      },
      (error) => console.error('Error loading following status:', error)
    );
  }

  // Check if the user is being followed
  isFollowing(user: any): boolean {
    if (!user || !this.followingIds.length) return false;
    
    const userId = typeof user === 'string' ? user : user._id;
    return this.followingIds.includes(userId);
  }

  // Toggle follow status
  toggleFollow(user: any): void {
    if (!this.currentUserId || !user) return;
    
    const targetId = typeof user === 'string' ? user : user._id;
    
    this.userService.toggleFollow(this.currentUserId, targetId).subscribe(
      (response) => {
        // Update local following list
        if (this.isFollowing(user)) {
          this.followingIds = this.followingIds.filter(id => id !== targetId);
        } else {
          this.followingIds.push(targetId);
        }
      },
      (error) => console.error('Error toggling follow status:', error)
    );
  }

  // Filter users based on search term
  get filteredUsers(): any[] {
    if (!this.searchTerm.trim()) return this.userData;
    
    const term = this.searchTerm.toLowerCase().trim();
    return this.userData.filter(user => 
      user?.name?.toLowerCase().includes(term)
    );
  }

  // Close the modal
  closeModal(): void {
    const modalElement = document.getElementById(this.id) as HTMLDialogElement;
    if (modalElement) {
      modalElement.close();
    }
  }
}