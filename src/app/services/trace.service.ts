import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class TraceService {
  private readonly http = inject(DataService);

  public getRecentTraces() {
    return this.http.get('api/v3/trades?symbol=BTCUSDT&limit=100');
  }

  public getHistoricalTraces(symbol: string, interval: string) {
    return this.http.get(`api/v3/klines?symbol=${symbol}&interval=${interval}`);
  }
}
