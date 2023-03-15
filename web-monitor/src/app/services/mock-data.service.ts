import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  devices$ = new Subject<Device[]>();

  private timer: number | undefined;
  private ms = 100;
  private numDevices = 2000;
  private localLevel = 50;

  constructor() { }

  startToGetMockDevices() {
    const timer = setInterval(() => this.createMockDevices(), this.ms);
    this.timer = Number(timer);
  }

  stopGettingMockDevices() {
    clearInterval(this.timer);
  }

  createMockDevices() {
    const devices = Array.from(Array(this.numDevices)).map((_, index) => {
      return {
        name: `device_${index}`,
        value1: Math.ceil(Math.random() * 50) + this.localLevel,
        value2: Math.ceil(Math.random() * 50) + this.localLevel,
        value3: Math.ceil(Math.random() * 50) + this.localLevel,
        status: Math.random() >= 0.8
      };
    });
    this.devices$.next(devices);
  }

  addLocalLevel() {
    this.localLevel += 20;
  }
}
