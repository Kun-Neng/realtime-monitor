import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { DeviceDirective } from './directives/device.directive';
import { AppComponent } from './app.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DeviceDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
