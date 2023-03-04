import { TestBed } from '@angular/core/testing';

import { SocketIOService } from './socketio.service';

describe('DataService', () => {
  let service: SocketIOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketIOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
