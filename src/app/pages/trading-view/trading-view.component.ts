import { AfterViewInit, Component, computed, effect, inject, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { LightweightChartsComponent } from '../../components/lightweight-charts/lightweight-charts.component';
import { IsBrowserRenderDirective } from '../../directives/is-browser-render.directive';

import { TradeService } from '../../services/trade.service';
import { KlineListItem } from '../../../models/kline-list-item.model';
import { CandlestickSeries, IChartApi, ISeriesApi, LineSeries } from 'lightweight-charts';
import _ from 'lodash';

@Component({
  selector: 'app-trading-view',
  imports: [
    FormsModule,
    RouterLink,
    IsBrowserRenderDirective,
    LightweightChartsComponent,
    NzFlexModule,
    NzButtonModule,
    NzSwitchModule,
    NzDividerModule
  ],
  templateUrl: './trading-view.component.html',
  styleUrl: './trading-view.component.scss'
})
export class TradingViewComponent implements OnInit, AfterViewInit {
  private readonly traceService = inject(TradeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  public lighweightChart = viewChild(LightweightChartsComponent);

  public chartType: WritableSignal<'candlestick' | 'line'> = signal('candlestick');
  public intervalOptions = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  public selectedSymbol = 'BCHBTC';
  public selectedInterval: WritableSignal<string> = signal('1m');
  public data = signal<KlineListItem[]>([]);

  private series = signal<ISeriesApi<any> | null>(null);

  constructor() {
    effect((onCleanup) => {
      const sub = this.traceService.getHistoricalTraces(this.selectedSymbol, this.selectedInterval()).subscribe((data) => {
        console.log(data);

        this.data.update(() => data);
      });

      onCleanup(() => {
        sub.unsubscribe();
      });
    });

    effect((onCleanup) => {
      const series = this.series();
      if (!series) {
        return;
      }

      if (this.chartType() === 'candlestick') {
        series.setData(
          this.data().map((item) => {
            return {
              time: item.klineOpenTime,
              open: _.toNumber(item.open),
              high: _.toNumber(item.high),
              low: _.toNumber(item.low),
              close: _.toNumber(item.close)
            };
          })
        );
      } else {
        series.setData(
          this.data().map((item) => {
            return {
              time: item.klineOpenTime,
              value: _.toNumber(item.close)
            };
          })
        );
      }

      onCleanup(() => {
        series.setData([]);
      });
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['interval']) {
        const interval = params['interval'];
        if (this.intervalOptions.includes(interval)) {
          this.selectedInterval.update(() => interval);
        }
      }
      if (params['symbol']) {
        this.selectedSymbol = params['symbol'];
      }
    });
  }

  ngAfterViewInit(): void {
    const chart = this.lighweightChart()?.theChart;
    if (!chart) {
      return;
    }

    // chart.addSeries(this.data());
    this.addChartSeries(chart);
  }

  public onChartTypeChanged() {
    this.chartType.update((type) => (type === 'candlestick' ? 'line' : 'candlestick'));

    const chart = this.lighweightChart()?.theChart;
    if (!chart) {
      return;
    }

    if (this.series()) {
      chart.removeSeries(this.series()!);
    }
    this.addChartSeries(chart);
  }

  private addChartSeries(chart: IChartApi) {
    const series = this.chartType() === 'candlestick' ? chart.addSeries(CandlestickSeries) : chart.addSeries(LineSeries);
    this.series.update(() => series);
  }
}
