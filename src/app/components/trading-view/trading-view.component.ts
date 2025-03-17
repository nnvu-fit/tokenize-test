import { AfterViewInit, Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { TraceService } from '../../services/trace.service';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { LightweightChartsComponent } from '../lightweight-charts/lightweight-charts.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-trading-view',
  standalone: true,
  imports: [LightweightChartsComponent, NzFlexModule, NzButtonModule, NzSwitchModule, NzDividerModule],
  templateUrl: './trading-view.component.html',
  styleUrl: './trading-view.component.scss'
})
export class TradingViewComponent implements AfterViewInit {
  private readonly traceService = inject(TraceService);

  public chartType: WritableSignal<'candlestick' | 'line'> = signal('candlestick');
  public intervalOptions = ['1s', '1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  public selectedSymbol = 'BCHBTC';
  public selectedInterval: WritableSignal<string> = signal('1m');

  constructor() {
    // effect to fetch historical traces on symbol or interval change
    effect(() => {
      const subs = this.traceService.getHistoricalTraces(this.selectedSymbol, this.selectedInterval()).subscribe((data) => {
        console.log(data);
      });

      return () => subs.unsubscribe();
    });
  }

  ngAfterViewInit(): void {}

  public changeInterval(interval: string): void {
    this.selectedInterval.update(() => interval);
  }

  public onChartTypeChanged() {
    this.chartType.update((type) => (type === 'candlestick' ? 'line' : 'candlestick'));
  }
}
