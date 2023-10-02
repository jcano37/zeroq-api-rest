import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

/**
 * Módulo para la gestión de usuarios.
 */
@Module({
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
}
