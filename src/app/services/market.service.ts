import { inject, Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Observable } from "rxjs";
import { MarketListItem } from "../models/market/market-list-item.model";

@Injectable({ providedIn: "root" })
export class MarketService {
  private http = inject(DataService);

  public getMarkets(): Observable<MarketListItem[]> {
    return this.http.get<MarketListItem[]>("api-sso/market/getmarkets");
  }
}