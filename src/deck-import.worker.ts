import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class DeckImportWorker {
  private readonly logger = new Logger(DeckImportWorker.name);

  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  async processImport(deckData: any) {
    this.logger.log('Iniciando a importação do baralho...');

    // Processa o deckData (validação, integração, etc.)
    // Simulação do processo de importação
    await new Promise(resolve => setTimeout(resolve, 3000)); // Aguardando 3 segundos para simular processamento

    this.logger.log('Importação do baralho concluída.');

    // Envia uma notificação para outra fila após o processamento
    await this.client.emit('deck_updates_queue', {
      message: 'Importação de baralho concluída',
      deckData,
    }).toPromise();
  }
}
