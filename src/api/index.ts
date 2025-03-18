import express from 'express';
import { tradeController } from './controllers/trade.controller';

export const api = express.Router();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use('/trades', tradeController);