import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommanderModule } from '../src/commander/commander.module';
import { getModelToken } from '@nestjs/mongoose';
import { CommanderService } from '../src/commander/commander.service';

describe('CommanderController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommanderModule],
    })
      .overrideProvider(getModelToken('Commander'))
      .useValue(CommanderModule)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/commander (GET)', () => {
    return request(app.getHttpServer())
      .get('/commander')
      .expect(200)
      .expect({
        // Esperado conteúdo da resposta
      });
  });
});
