import { inject, Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { GetMarketOutput } from "../models/market/get-market-output.model";

@Injectable({ providedIn: "root" })
export class MarketService {
  private http = inject(DataService);

  public getMarkets() {
    return this.http.get<GetMarketOutput>("api-sso/market/getmarkets");
  }
}