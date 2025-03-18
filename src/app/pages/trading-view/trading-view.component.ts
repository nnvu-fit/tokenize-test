import { AfterViewInit, Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TradeService } from '../../services/trade.service';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { LightweightChartsComponent } from '../../components/lightweight-charts/lightweight-charts.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IsBrowserRenderDirective } from '../../directives/is-browser-render.directive';

@Component({
    selector: 'app-trading-view',
    imports: [RouterLink, IsBrowserRenderDirective, LightweightChartsComponent, NzFlexModule, NzButtonModule, NzSwitchModule, NzDividerModule],
    templateUrl: './trading-view.component.html',
    styleUrl: './trading-view.component.scss'
})
export class TradingViewComponent implements OnInit, AfterViewInit {
  private readonly traceService = inject(TradeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  public chartType: WritableSignal<'candlestick' | 'line'> = signal('candlestick');
  public intervalOptions = ['1s', '1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  public selectedSymbol = 'BCHBTC';
  public selectedInterval: WritableSignal<string> = signal('1m');

  constructor() {
    // effect to fetch historical traces on symbol or interval change
    effect((onCleanUp) => {
      console.log('interval', this.selectedInterval());
      
      const subs = this.traceService.getHistoricalTraces(this.selectedSymbol, this.selectedInterval()).subscribe((data) => {
        // console.log(data);
      });

      onCleanUp(() => subs.unsubscribe());
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['interval']) {
        const interval = params['interval'];
        if (!this.intervalOptions.includes(interval)) {
        } else {
          this.selectedInterval.update(() => interval);
        }
      }
      if (params['symbol']) {
        this.selectedSymbol = params['symbol'];
      }
    });
  }

  ngAfterViewInit(): void {}

  public onChartTypeChanged() {
    this.chartType.update((type) => (type === 'candlestick' ? 'line' : 'candlestick'));
  }
}
