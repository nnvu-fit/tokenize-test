import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { log } from 'console';
import { createChart, IChartApi, LineSeries } from 'lightweight-charts';

@Component({
  selector: 'app-lightweight-charts',
  standalone: true,
  imports: [],
  templateUrl: './lightweight-charts.component.html',
  styleUrl: './lightweight-charts.component.scss',
})
export class LightweightChartsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private ef = inject(ElementRef);

  public theChart!: IChartApi;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Create a chart
    this.theChart = createChart(this.ef.nativeElement, {
      height: 600,
      autoSize: true,
    });
  }

  @HostBinding('style.display')
  get display() {
    return 'block';
  }
  @HostBinding('style.width')
  get width() {
    return '100%';
  }

}
