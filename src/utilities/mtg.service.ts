// src/utilities/mtg.service.ts
import axios from 'axios';

class MTGService {
    private readonly baseURL: string = 'https://api.magicthegathering.io/v1';

    async getCardsByColor(color: string) {
        try {
            const response = await axios.get(`${this.baseURL}/cards`, {
                params: { colors: color }
            });
            return response.data.cards;
        } catch (error) {
            console.error('Error fetching cards from MTG API:', error);
            throw error;
        }
    }
}

export default new MTGService();
