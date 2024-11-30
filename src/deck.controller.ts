import { Controller, Post, Body, Req } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Controller('decks')
export class DeckController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('import')
  async importDeck(@Body() deck: any, @Req() req: any) {
    const userRole = req.user.role; // Supondo que o usuário está autenticado
    const priority = userRole === 'admin' ? 10 : 5;
    const message = JSON.stringify(deck);
  
    await this.rabbitMQService.sendToQueue('deck_import_queue', message, priority);
    return { status: 'Deck import in progress with priority ' + priority };
  }
  
}
