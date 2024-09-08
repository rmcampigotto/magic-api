import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthGuard } from '../src/auth/auth.guard';

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

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
  
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/commander/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/commander/create')
      .send({
        name: 'Test Commander',
        type: 'Creature',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toBe('Commander salvo com sucesso!');
      });
  });

  it('/commander/findAll (GET)', () => {
    return request(app.getHttpServer())
      .get('/commander/findAll')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/commander/findById/:commanderName (GET)', () => {
    const commanderName = 'Test Commander';
    return request(app.getHttpServer())
      .get(`/commander/findById/${commanderName}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(commanderName);
      });
  });

  it('/commander/update/:commanderName (PATCH)', () => {
    const commanderName = 'Test Commander';
    return request(app.getHttpServer())
      .patch(`/commander/update/${commanderName}`)
      .send({ type: 'Updated Type' })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe(`Commander salvo com sucesso!`);
      });
  });

  it('/commander/delete/:commanderName (DELETE)', () => {
    const commanderName = 'Test Commander';
    return request(app.getHttpServer())
      .delete(`/commander/delete/${commanderName}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe(`Commander deletado com sucesso!`);
      });
  });

  it('/commander/apiGetAndSave/:commanderName (POST)', () => {
    const commanderName = 'Test Commander';
    return request(app.getHttpServer())
      .post(`/commander/apiGetAndSave/${commanderName}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Busca na API realizada com sucesso e salvo no banco!');
      });
  });

  it('/commander/export (GET)', () => {
    return request(app.getHttpServer())
      .get('/commander/export')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Deck exportado!');
      });
  });
});
