import {Module} from '@nestjs/common';
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {DatabaseConfig} from './database/database.config';
import {LogsModule} from "./logs/logs.module";
import {LoggerService} from "./logs/logs.service";
import {CryptoModule} from "./crypto/crypto.module";

/**
 * Módulo raíz de la aplicación, define las importaciones, controladores
 * y proveedores principales de la aplicación.
 */
@Module({
    imports: [LogsModule, CryptoModule],
    controllers: [UsersController],
    providers: [UsersService, DatabaseConfig, LoggerService],
})
export class AppModule {
}
