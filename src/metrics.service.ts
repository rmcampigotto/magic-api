import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('deck_imports_total') private readonly deckImports: Counter<string>,
  ) {}

  incrementDeckImport() {
    this.deckImports.inc(); // Incrementa o contador
  }
}
