import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Importação ajustada para TypeScript
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );

  // Habilitar CORS
  app.enableCors();

  // Iniciar aplicação
  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
