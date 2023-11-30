import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit,OnDestroy {

  constructor(private socketService: SocketioService) {}

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
