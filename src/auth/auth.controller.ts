import {Controller, Post, Body, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersService} from '../users/users.service';
import {LoggerService} from "../logs/logs.service";

/**
 * Controlador que maneja las solicitudes de autenticación.
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersService: UsersService, private readonly loggerService: LoggerService) {
    }

    /**
     * Maneja las solicitudes POST a '/auth/login' para autenticar a un usuario.
     *
     * @param {Object} userCredentials - Las credenciales del usuario.
     * @param {string} userCredentials.username - Nombre de usuario del usuario.
     * @param {string} userCredentials.password - Contraseña del usuario.
     * @returns {Promise<Object>} Un objeto con un token de acceso si la autenticación es exitosa.
     */
    @Post('login')
    async login(@Body() userCredentials: { username: string; password: string }): Promise<object> {
        const user = await this.usersService.userExists(userCredentials.username);

        if (!user) {
            this.loggerService.logError('AuthController: User does not exist')
            throw new NotFoundException('User does not exist');
        }

        const isPasswordValid = await this.authService.comparePasswords(userCredentials.password, user.password);

        if (!isPasswordValid) {
            this.loggerService.logError('AuthController: Password is incorrect')
            throw new UnauthorizedException('Password is incorrect');
        }

        const payload = {username: user.username, sub: user.id};
        const token = this.authService.generateToken(payload);
        this.loggerService.logDebug('AuthController:' + token)
        return {access_token: token};
    }
}
