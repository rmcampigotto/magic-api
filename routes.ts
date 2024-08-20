import { Router } from 'express';
import cards from './src/utilities/cards';
import commanderController from './src/commander-deck/commander.controller';

const routes = Router()

routes.get('/cards/get100/:export', cards.get100);

routes.get('/commander/FindById/:id', commanderController.findOneAndReturnCommanderId);
routes.post('/commander/create', commanderController.create);

export {
    routes
}