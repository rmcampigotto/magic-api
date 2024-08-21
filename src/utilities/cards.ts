import commanderService from "../commander-deck/commander.service";
import _export from "./export";
import { Request, Response } from "express";

class Cards {
    async get100(req: Request, res: Response) {
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
            const commander = commanderResponse[0];

            if (!commander) {
                return res.status(204).json('Nenhum comandante encontrado');
            }

            deck.commander = {
                //@ts-ignore
                commanderId: commander.commanderID, 
                //@ts-ignore
                name: commander.name,
                //@ts-ignore
                color: commander.color
            };
            
            //@ts-ignore
            commander.cards.forEach(card => {
                cards.name = card.name;
                cards.color = card.color;
                cards.Ability = card.Ability;

                deck.cards.push(cards);
            });

            _export.exportJson(deck);

            return res.status(200).json(deck);
        } catch (error) {
            return res.status(500).json('ERRO AO EXPORTAR AS 100 CARTAS DO DECK: ' + error.message);
        }
    }
}

export default new Cards();
