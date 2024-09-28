import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CommanderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/commander (GET)', () => {
    return request(app.getHttpServer())
      .get('/commander')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/commander (POST)', () => {
    return request(app.getHttpServer())
      .post('/commander')
      .send({
        commanderName: 'Test Commander',
        color: 'Red',
        cards: [],
        userId: 1,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.commanderName).toBe('Test Commander');
      });
  });
});
