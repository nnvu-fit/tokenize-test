import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { KlineListItem } from '../../models/kline-list-item.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private readonly http = inject(DataService);

  public getRecentTraces() {
    return this.http.get('trades?symbol=BTCUSDT&limit=100');
  }

  public getHistoricalTraces(symbol: string, interval: string): Observable<KlineListItem[]> {
    return this.http.get(`trades/klines?symbol=${symbol}&interval=${interval}`);
  }
}
