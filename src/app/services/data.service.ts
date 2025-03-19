import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

  private domain = '/api/';

  public get<T>(path: string, skipError: boolean = false): Observable<T> {
    return this.http.get<T>(this.domain + path).pipe(
      map((response: T) => response),
      catchError((error) => {
        console.error('Error:', error);
        if (skipError) {
          return new Observable<T>();
        }
        throw error;
      })
    );
  }

  public post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.domain + path, body).pipe(
      map((response: T) => response),
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
