import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  // emit event
  sendMessage(topic: string, data: any) {
    this.socket.emit(topic, data);
  }

  // listen event
  getMessage$() {
    return this.socket.fromEvent('notifications').pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
