import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Monitor';

  status$ = this.dataService.getStatus();

  constructor(private dataService: DataService) { }

  update() {
    this.dataService.sendCommand({
      name: 'update',
      content: 'Test',
      value: 10
    });
  }
}
