import { Component, OnInit } from '@angular/core';
import { SocketIOService } from './services/socketio.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Monitor';

  // devices$ = this.socketIOService.getDevices();
  devices$ = this.websocketService.devices$;
  
  // constructor(private socketIOService: SocketIOService) { }
  constructor(private websocketService: WebsocketService) { }
  
  ngOnInit(): void {
    this.websocketService.startToGetDevices();
  }

  update() {
    // this.socketIOService.sendCommand({
    //   name: 'update',
    //   content: 'Test',
    //   value: 10
    // });

    this.websocketService.sendCommand({
      name: 'update',
      content: 'Test',
      value: 10
    });
  }
}
