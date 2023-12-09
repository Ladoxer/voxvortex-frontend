import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedUser: string = null;
  followingUser = [];


  constructor(private userService: UserServiceService, private socketService: SocketioService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userData');
    this.userService.getFollowings(userId).subscribe((data)=>{
      this.followingUser = data;
    });
  }

  onSelectUser(userId: string){
    this.selectedUser = userId;
    const loggedUserId = localStorage.getItem('userData');
    this.socketService.createChat(loggedUserId,userId);
    this.socketService.getChatHistory();
    this.socketService.getSelctedUserName(userId);
  }

  ngOnDestroy(): void {
    
  }
}
