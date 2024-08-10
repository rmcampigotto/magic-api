import { Router } from 'express';
import cards from './src/utilities/cards';

const routes = Router()

routes.get('/cards/get100/:export', cards.get100);

export {
    routes
}