import {Module} from '@nestjs/common';
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {DatabaseConfig} from './database/database.config';
import {LogsModule} from "./logs/logs.module";
import {LoggerService} from "./logs/logs.service";
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import {ConfigModule} from "@nestjs/config";

/**
 * Módulo raíz de la aplicación, define las importaciones, controladores
 * y proveedores principales de la aplicación.
 */
@Module({
    imports: [LogsModule, ConfigModule.forRoot({
        isGlobal: true,
    })],
    controllers: [UsersController, AuthController],
    providers: [UsersService, DatabaseConfig, LoggerService, AuthService],
})
export class AppModule {
}
