import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: Socket;

  backedUrl = 'http://localhost:3000'; //! must be in environment

  constructor() { }

  setupSocketConnection() {
    this.socket = io(this.backedUrl);
  }

  disconnect(){
    this.socket.disconnect();
  }
}
