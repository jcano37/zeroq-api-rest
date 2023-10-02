import {Controller, Post, Body} from '@nestjs/common';
import {Users} from './users.model';
import {UsersService} from './users.service';

/**
 * Controlador para la gestión de usuarios.
 */
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    /**
     * Maneja una solicitud POST para crear un nuevo usuario.
     *
     * @param {Users} user - Los datos del usuario a crear.
     * @returns {Promise<any>} Una promesa que resuelve cuando se ha creado el usuario.
     */
    @Post()
    async createUser(@Body() user: Users): Promise<any> {
        return this.usersService.createUser(user);
    }
}
