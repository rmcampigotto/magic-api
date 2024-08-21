import axios from 'axios';

class MTGService {
    private readonly baseURL: String = 'https://api.magicthegathering.io/v1';

    async getCommanderByName(name: String) {
        try {
            const response = await axios.get(`${this.baseURL}/cards`, {
                params: { name: name, pageSize: 1 }
            });
            const cards = response.data.cards;
            if (cards.length > 0) {
                return cards[0];
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

    async getFullDeck(commanderName: String, color: String) {
        try {
            const commander = await this.getCommanderByName(commanderName);
            const deck = await this.getDeckByColor(color);

            return {
                commander,
                deck
            };
        } catch (error) {
            console.error('Error fetching full deck from MTG API:', error);
            throw error;
        }
    }
}

export default new MTGService();
