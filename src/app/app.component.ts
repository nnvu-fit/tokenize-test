import { Component } from '@angular/core';
import { TradingViewComponent } from './components/trading-view/trading-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TradingViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tokenize-test';
}
