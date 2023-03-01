import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';

interface Status {
  deviceA: number;
  deviceB: number;
  deviceC: number;
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private socket: Socket) { }

  getStatus(): Observable<Status> {
    return this.socket.fromEvent<Status>('status').pipe(map(data => data));
  }

  sendCommand(command: { name: string, content?: string, value?: number }) {
    this.socket.emit('command', command);
  }
}
