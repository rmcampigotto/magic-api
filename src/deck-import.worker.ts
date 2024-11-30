import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Injectable()
export class DeckImportWorker {
  private readonly logger = new Logger(DeckImportWorker.name);

  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy, private readonly metricsService: MetricsService) {}
  
  async processImport(deckData: any) {
    this.logger.log('Iniciando a importação do baralho...');
    this.metricsService.incrementDeckImport();

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
