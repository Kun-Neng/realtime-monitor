import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  constructor(private socket: Socket) { }

  getDevices(): Observable<Device[]> {
    return this.socket.fromEvent<Device[]>('devices').pipe(map(data => data));
  }

  sendCommand(command: { name: string, content?: string, value?: number }) {
    this.socket.emit('command', command);
  }
}
