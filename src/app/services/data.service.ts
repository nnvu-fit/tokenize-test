import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';
import { DataResponse } from '../models/data-response.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  private domain = 'https://api.binance.com/';

  public get<T>(path: string): Observable<T> {
    return this.http.get<DataResponse<T>>(this.domain + path).pipe(
      map((response: DataResponse<T>) => response.data),
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  public post<T>(path: string, body: any): Observable<T> {
    return this.http.post<DataResponse<T>>(this.domain + path, body).pipe(
      map((response: DataResponse<T>) => response.data),
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
