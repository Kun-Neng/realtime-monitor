import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket = new WebSocket('ws://localhost:3000');

  devices$ = new Subject<Device[]>();

  constructor() { }

  startToGetDevices() {
    this.socket.onmessage = (event) => {
      this.devices$.next(JSON.parse(event.data));
    }
  }

  sendCommand(command: { name: string, content?: string, value?: number }) {
    this.socket.send(JSON.stringify(command));
  }

  close() {
    this.socket.close();
  }
}
