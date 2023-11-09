import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) { }

  // emit event
  sendMessage(topic: string, data: any) {
    this.socket.emit(topic, data);
  }

  // listen event
  getMessage$(topicMessage: string) {
    return this.socket.fromEvent(topicMessage).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
