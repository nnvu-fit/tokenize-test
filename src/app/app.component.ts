import { Component, inject, OnInit } from '@angular/core';
import { TradingViewComponent } from './components/trading-view/trading-view.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TradingViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly http = inject(DataService);

  title = 'tokenize-test';
  
  ngOnInit() {
    this.http.get('api/v3/ping', true).subscribe((data) => {
      console.log(data);
    });
  }
}
