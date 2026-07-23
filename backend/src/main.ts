// Archivo principal de la aplicación: crea y configura la instancia de NestJS.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Función principal: crea la aplicación, habilita CORS y la hace escuchar en el puerto 3000.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  await app.listen(3000);
}
bootstrap();
