import { Directive, HostBinding, Input } from '@angular/core';
import { Device } from '../models/device';

@Directive({
  selector: '[appDevice]'
})
export class DeviceDirective {
  @Input() device!: Device;

  @HostBinding('style.width.px') width = '15';
  @HostBinding('style.height.px') height = '15';
  @HostBinding('style.border') border = '1px solid white';
  
  @HostBinding('style.background-color') get backgroundColor(): string {
    return `rgb(${this.device.value1}, ${this.device.value2}, ${this.device.value3})`;
  }
}
