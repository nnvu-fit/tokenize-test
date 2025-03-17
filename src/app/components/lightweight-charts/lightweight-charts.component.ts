import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { createChart, IChartApi } from 'lightweight-charts';

@Component({
  selector: 'app-lightweight-charts',
  standalone: true,
  template: ''
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
      autoSize: true
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
