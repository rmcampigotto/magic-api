import axios from 'axios';
import { UserController } from 'src/users/user.controller';

class MtgClass {
    private readonly baseURL: String = 'https://api.magicthegathering.io/v1';

    async getCommanderByNameAndCards(name: String, userId: NumberConstructor) {

        let commander = {
            commanderName: String,
            color: String,
            cards: Array(),
            userId: Number,
        }; 

        try {

            const response = await axios.get(`${this.baseURL}/cards`, {
                params: { name: name, pageSize: 1 }
            });

            const result = response.data.cards;
            if (result.length > 0) {

                commander.commanderName = result[0].name;
                commander.color = result[0].colors[0];

                const cards = await this.getDeckByColor(commander.color.toString());

                cards.forEach((card: any) => {

                    commander.cards.push(card);

                });

                commander.userId = userId;

                return commander;
            } else {
                throw new Error(`Commander ${name} not found`);
            }
        } catch (error) {
            console.error('Error fetching Commander card from MTG API:', error);
            throw error;
        }
    }

    async getDeckByColor(color: String) {
        try {
            const response = await axios.get(`${this.baseURL}/cards`, {
                params: { colors: color, pageSize: 99 }
            });
            return response.data.cards;
        } catch (error) {
            console.error('Error fetching deck cards from MTG API:', error);
            throw error;
        }
    }
    
}

export default new MtgClass();