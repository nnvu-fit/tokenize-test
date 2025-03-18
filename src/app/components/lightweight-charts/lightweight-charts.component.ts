import { Component, ElementRef, HostBinding, inject, OnInit } from '@angular/core';
import { createChart, IChartApi } from 'lightweight-charts';

@Component({
  selector: 'app-lightweight-charts',
  template: ''
})
export class LightweightChartsComponent implements OnInit {
  private ef = inject(ElementRef);

  public theChart!: IChartApi;

  ngOnInit(): void {
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
