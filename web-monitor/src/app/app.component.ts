import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockDataService } from './services/mock-data.service';
import { SocketIOService } from './services/socketio.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Web Monitor';

  // devices$ = this.mockDataService.devices$;
  // devices$ = this.socketIOService.getDevices();
  devices$ = this.websocketService.devices$;
  
  // constructor(private mockDataService: MockDataService) { }
  // constructor(private socketIOService: SocketIOService) { }
  constructor(private websocketService: WebsocketService) { }
  
  ngOnInit(): void {
    // this.mockDataService.startToGetMockDevices();
    this.websocketService.startToGetDevices();
  }

  ngOnDestroy(): void {
    // this.mockDataService.stopGettingMockDevices();
  }

  update() {
    // this.mockDataService.addLocalLevel();

    // this.socketIOService.sendCommand({
    //   name: 'update',
    //   content: 'Test',
    //   value: 10
    // });

    this.websocketService.sendCommand({
      name: 'update',
      content: 'Test',
      value: 50
    });
  }
}
