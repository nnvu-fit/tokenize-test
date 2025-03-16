import { DataResponse } from "../data-response.model";
import { MarketListItem } from "./market-list-item.model";

export interface GetMarketOutput extends DataResponse<MarketListItem[]> {
}