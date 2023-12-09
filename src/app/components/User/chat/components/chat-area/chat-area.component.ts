import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit,OnDestroy {
  @Input() selectedUser: string;
  selectedUserName: string;
  roomData: string = '';
  private roomSubscription: Subscription | undefined;
  text: string = '';
  allMessages = [];
  private allMessageSubscription: Subscription | undefined;
  private messageSubscription: Subscription | undefined;
  private selectedUserNameSubscription: Subscription | undefined;
  id: string = '';

  constructor(private socketService: SocketioService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('userData');
    this.socketService.setupSocketConnection();
    this.roomSubscription = this.socketService.room$.subscribe((data: string) => {
      this.roomData = data;
    });
    this.socketService.joinRoom();
    this.allMessageSubscription = this.socketService.allMessages$.subscribe((data: []) => {
      this.allMessages = data;
    });
    this.messageSubscription = this.socketService.message$.subscribe((data)=>{
      this.allMessages.push(data);
    })
    this.selectedUserNameSubscription = this.socketService.slectedUserName$.subscribe((data: string) => {
      this.selectedUserName = data;
    })
  }

  onSubmitMessage(){
    const sender_id = localStorage.getItem('userData');
    if(!(this.text.trim() === "")){
      const messageData = {
        text: this.text,
        sender_id: sender_id,
        chat_id: this.roomData,
        time: new Date().toLocaleTimeString()
      }
      this.socketService.sendMessage(messageData);
      this.allMessages.push(messageData);

      this.text = "";
    }
  }

  ngOnDestroy(): void {
    this.socketService.socketOff();
    this.socketService.disconnect();
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.allMessageSubscription) {
      this.allMessageSubscription.unsubscribe();
    }
    if (this.selectedUserNameSubscription) {
      this.selectedUserNameSubscription.unsubscribe();
    }
  }
}
