import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/trading-view/trading-view.component').then(
        (m) => m.TradingViewComponent
      ),
  },
];
