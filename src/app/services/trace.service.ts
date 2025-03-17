import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class TraceService {
  private readonly http = inject(DataService);

  public getRecentTraces() {
    return this.http.get('api/v3/trades?symbol=BTCUSDT&limit=100');
  }

  public getHistoricalTraces() {
    return this.http.get('api/v3/historicalTrades?symbol=BTCUSDT&limit=100');
  }
}
