import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { KlineListItem } from '../../models/kline-list-item.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private readonly http = inject(DataService);

  public getHistoricalTraces(symbol: string, interval: string): Observable<KlineListItem[]> {
    return this.http.get(`trades/klines?symbol=${symbol}&interval=${interval}`);
  }
}
