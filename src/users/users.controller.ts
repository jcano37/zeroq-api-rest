import {Controller, Post, Body, ConflictException} from '@nestjs/common';
import {Users} from './users.model';
import {UsersService} from './users.service';
import {LoggerService} from "../logs/logs.service";

/**
 * Controlador para la gestión de usuarios.
 */
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly loggerService: LoggerService) {
    }

    /**
     * Maneja una solicitud POST para crear un nuevo usuario.
     *
     * @param {Users} user - Los datos del usuario a crear.
     * @returns {Promise<any>} Una promesa que resuelve cuando se ha creado el usuario.
     */
    @Post('register')
    async createUser(@Body() user: Users): Promise<any> {
        const insertedUser = await this.usersService.createUser(user)
        const DEBUG = process.env.DEBUG === 'true'

        if (!insertedUser) {
            throw new ConflictException('User already exists');
        }
        if (DEBUG) {
            this.loggerService.logDebug(JSON.stringify(insertedUser));
        }
        return insertedUser;
    }
}
