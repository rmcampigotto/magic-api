import { Injectable } from '@nestjs/common';
import { NotificationGateway } from '../notification/notification.gateway';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  [x: string]: any;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly notificationGateway: NotificationGateway) {}

  async connect() {
    this.connection = await amqp.connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();
  }

  async consumeAndNotify(queue: string) {
    await this.channel.assertQueue(queue);
    this.channel.consume(queue, (msg) => {
      if (msg) {
        const update = JSON.parse(msg.content.toString());
        this.notificationGateway.notifyAll('update', update); // Envia o evento via WebSocket
        this.channel.ack(msg);
      }
    });
  }

  async processDeckImport() {
    await this.channel.assertQueue('deck_import_queue');
    this.channel.consume('deck_import_queue', async (msg) => {
      if (msg) {
        const deck = JSON.parse(msg.content.toString());
        console.log('Processing deck:', deck);
        const result = { deckId: deck.id, status: 'completed' };
        await this.sendToQueue('deck_updates_queue', JSON.stringify(result));
        this.channel.ack(msg);
      }
      this.metricsService.incrementDeckImport();
    });
  }

  async sendToQueue(queue: string, message: string, priority = 0) {
    await this.channel.assertQueue(queue, { arguments: { 'x-max-priority': 10 } });
    this.channel.sendToQueue(queue, Buffer.from(message), { priority });
  }

  async createQueue(queueName: string) {
    await this.channel.assertQueue(queueName, {
      durable: true, // As mensagens são persistidas
    });
  }

  async consume(queueName: string, callback: (msg: amqp.ConsumeMessage) => void) {
    await this.channel.consume(queueName, (msg) => {
      if (msg) {
        callback(msg);
        this.channel.ack(msg); // Confirma o processamento da mensagem
      }
    });
  }
  
}
