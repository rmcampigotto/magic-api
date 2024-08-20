import commanderService from "../commander-deck/commander.service";
import _export from "./export";
import mtgService from "./mtg.service";
import { Request, Response } from "express";

class Cards {

    async get100(req: Request, res: Response) {
        try {
            const deck = {
                commander: {
                    commanderId: 0,
                    name: '',
                    color: ''
                },
                cards: [] as Array<{ name: string, color: string, Ability: string }>
            };

            const commanderResponse = await commanderService.findAll();
            const commander = commanderResponse[0];

            // Garantindo que o commander exista antes de atribuir valores
            if (commander) {
                deck.commander.commanderId = commander.commanderID;
                deck.commander.name = commander.name;
                deck.commander.color = commander.color;

                const mtgCards = await mtgService.getCardsByColor(commander.color);

                mtgCards.forEach(card => {
                    deck.cards.push({
                        name: card.name,
                        color: card.colors.join(', '),
                        Ability: card.text || ''
                    });
                });
            } else {
                return res.status(404).json('Nenhum comandante encontrado');
            }

            if (req.params.export == '1') {
                _export.exportJson(deck);
            }

            return res.status(200).json(deck);
        } catch (error) {
            return res.status(404).json('ERRO AO BUSCAR AS 100 CARTAS DO DECK: ' + error);
        }
    }

}

export default new Cards();
