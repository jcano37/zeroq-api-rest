import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {LoggerService} from "../logs/logs.service";

/**
 * Módulo de autenticación, proporciona servicios y controladores para gestionar la autenticación.
 */
@Module({
    providers: [AuthService, LoggerService],
    controllers: [AuthController],
})
export class AuthModule {
}
