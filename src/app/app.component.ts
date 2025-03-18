import { Component, inject, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
