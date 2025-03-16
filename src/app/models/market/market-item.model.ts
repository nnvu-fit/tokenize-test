export interface MarketItemModel {
  id: number;
  marketId: string;
  marketName: string;
  baseCurrency: string;
  marketCurrency: string;
  marketCurrencyLong: string;
  ceiling: string;
  floor: string;
  baseIncrement: string;
  quoteIncrement: string;
  baseMinSize: string;
  baseMaxSize: string;
  tradingStatus: string;
  listRoles: string;
  baseCurrencyTruncate: number;
  priceTruncate: number;
  quoteCurrencyTruncate: number;
}
// Compare this snippet from src/app/models/market/get-markets-output.model.ts:
// {
//   "id": 15,
//   "marketId": "BTC",
//   "marketName": "BTC-BCH",
//   "baseCurrency": "BTC",
//   "marketCurrency": "BCH",
//   "marketCurrencyLong": "Bitcoin Cash",
//   "ceiling": "1000.00000000",
//   "floor": "0.00000001",
//   "baseIncrement": "0.00000001",
//   "quoteIncrement": "0.001",
//   "baseMinSize": null,
//   "baseMaxSize": null,
//   "tradingStatus": "enabled",
//   "listRoles": null,
//   "baseCurrencyTruncate": 8,
//   "priceTruncate": 8,
//   "quoteCurrencyTruncate": 8
// }