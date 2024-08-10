import commanderService from "../commander-deck/commander.service";
import _export from "./export";
import { Request, Response } from "express";

class Cards{

    async get100(req: Request, res: Response){
        try {
            
            let cards = {
                name: String,
                color: String,
                Ability: String
            };

            let deck = {
                commander: {
                    commanderId: Number,
                    name: String,
                    color: String
                },
                cards: Array()
            };

            const commanderResponse = await commanderService.findAll();

            //@ts-ignore
            deck.commander.commanderId = commanderResponse[0].commanderId;
            //@ts-ignore
            deck.commander.name = commanderResponse[0].name;
            //@ts-ignore
            deck.commander.color = commanderResponse[0].color;

            //@ts-ignore
            commanderResponse[0].cards.forEach(card => {
                cards.name = card.name;
                cards.color = card.color;
                cards.Ability = card.Ability;

                deck.cards.push(cards);
            });

            if(req.params.export == '1'){
                _export.exportJson(deck);
            }
            return res.status(200).json(deck);
        } catch (error) {
            return res.status(404).json('ERRO AO BUSCAR AS 100 CARTAS DO DECK: ' + error);
        }
    }

}

export default new Cards();