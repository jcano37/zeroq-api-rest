import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Función principal que inicia la aplicación.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}

bootstrap().then().catch((error) => {
    console.error('Error al iniciar la aplicación:', error);
});
