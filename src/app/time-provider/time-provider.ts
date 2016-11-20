import {Injectable, OpaqueToken} from '@angular/core';

export const TimeProviderToken = new OpaqueToken('TimeProvider');

export interface TimeProvider {
  getTime(): number;
}

@Injectable()
export class RealTimeProvider implements TimeProvider {
  getTime(): number {
    return new Date().getTime();
  }
}
