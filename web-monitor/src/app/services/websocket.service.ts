import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // private socket = new WebSocket('ws://localhost:3000');
  private socket = webSocket('ws://localhost:3000');

  devices$ = new Subject<Device[]>();

  constructor() { }

  startToGetDevices() {
    // this.socket.onmessage = (event) => {
    //   this.devices$.next(JSON.parse(event.data));
    // }
    this.socket.subscribe({
     next: (data: any) => this.devices$.next(data),
     error: err => console.log(err),
     complete: () => console.log('complete')
   });
  }

  sendCommand(command: { name: string, content?: string, value?: number }) {
    // this.socket.send(JSON.stringify(command));
    this.socket.next(JSON.stringify(command));
  }

  close() {
    // this.socket.close();
    this.socket.complete();
  }
}
