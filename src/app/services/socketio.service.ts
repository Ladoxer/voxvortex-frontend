import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: Socket;

  backedUrl = 'http://localhost:3000'; //! must be in environment
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  private roomSubject: Subject<string> = new Subject<string>();
  public room$: Observable<string> = this.roomSubject.asObservable();

  private allMessagesSubject: Subject<[]> = new Subject<[]>();
  public allMessages$: Observable<[]> = this.allMessagesSubject.asObservable();

  private messageSubject: Subject<any> = new Subject<any>();
  public message$: Observable<any> = this.messageSubject.asObservable();

  private selectedUserNameSubject: Subject<string> = new Subject<string>();
  public slectedUserName$: Observable<string> = this.selectedUserNameSubject.asObservable();

  setupSocketConnection() {
    this.socket = io(this.backedUrl);

    this.socket.on('receive_message', (data) => {
      this.messageSubject.next(data);
    })
  }

  joinRoom() {
    this.room$.subscribe((room:string)=>{
      // console.log(room);
      this.socket.emit("join_room",room);
    })
    // console.log(room);
    // this.socket.emit("join_room", room);
  }

  socketOff(){
    this.socket.off('receive_message');
  }

  createChat(selectedUserId: string, userId: string) {
    return this.http.get(`${this.apiUrl}/chat/${selectedUserId}/${userId}`,httpOptions).subscribe((chatId: string) => {
      this.roomSubject.next(chatId);
    })
  }

  sendMessage(messageData){
    this.socket.emit("send_message",messageData);
  }

  getChatHistory(){
    this.room$.subscribe((room:string)=>{
      return this.http.post(`${this.apiUrl}/chat/history/${room}`,httpOptions).subscribe((data: [])=>{
        this.allMessagesSubject.next(data);
      })
    })
  }

  getSelctedUserName(userId: string){
    this.http.get(`${this.apiUrl}/users/${userId}`,httpOptions).subscribe((data: any) => {
      this.selectedUserNameSubject.next(data.name);
    })
  }

  disconnect(){
    this.socket.disconnect();
  }
}
