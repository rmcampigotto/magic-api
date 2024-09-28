import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000); 

  it('/api/commander (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/commander') 
      .expect(200) 
      .expect((res) => {
        
        expect(res.body).toHaveProperty('data'); 
        expect(Array.isArray(res.body.data)).toBe(true); 
      });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
