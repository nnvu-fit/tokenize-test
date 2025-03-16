import { Component, inject, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { MarketListItem } from '../../models/market/market-list-item.model';

@Component({
  selector: 'app-trading-view',
  standalone: true,
  imports: [],
  templateUrl: './trading-view.component.html',
  styleUrl: './trading-view.component.scss'
})
export class TradingViewComponent implements OnInit {
  private readonly marketService = inject(MarketService);

  ngOnInit(): void {
    this.marketService.getMarkets().subscribe((markets: MarketListItem[]) => {
      console.log(markets);
    });
  }
}
