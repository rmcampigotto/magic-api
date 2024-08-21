import { Router } from 'express';
import cards from './src/utilities/cards';
import commanderController from './src/commander-deck/commander.controller';
import mtgService from './src/utilities/mtg.service';

const routes = Router()

routes.get('/cards/get100', cards.get100);

routes.get('/commander/FindById/:id', commanderController.findOneAndReturnCommanderId);
routes.post('/commander/create', commanderController.create);

routes.get('/commander/name/:name', mtgService.getCommanderByName);
routes.get('/deck/color/:color', mtgService.getDeckByColor);

export {
    routes
}