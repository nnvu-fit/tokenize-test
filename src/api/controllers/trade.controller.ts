import express from 'express';
import { axiosService } from '../services/axios.service';
import { KlineListItem } from '../../models/kline-list-item.model';

export const tradeController = express.Router();

tradeController.get('/klines', (req, res) => {
  const symbol = req.query['symbol'];
  const interval = req.query['interval'];
  const startTime = req.query['startTime'];
  const endTime = req.query['endTime'];
  const limit = req.query['limit'];

  // Handle API request by calling Binance API
  // Example:
  // const klines = await binance.klines({
  //   symbol: symbol,
  //   interval: interval,
  //   startTime: startTime,
  //   endTime: endTime,
  //   limit: limit,
  // });
  // res.json(klines);

  axiosService
    .get('/api/v3/klines', {
      params: {
        symbol: symbol,
        interval: interval,
        startTime: startTime,
        endTime: endTime,
        limit: limit
      }
    })
    .then((response) => {
      const data = response.data.map((item: any[]) => {
        return <KlineListItem>{
          klineOpenTime: item[0],
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
          volume: item[5],
          klineCloseTime: item[6],
          quoteAssetVolume: item[7],
          numberOfTrades: item[8],
          takerBuyBaseAssetVolume: item[9],
          takerBuyQuoteAssetVolume: item[10],
          ignore: item[11]
        };
      });
      res.json(data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
});
