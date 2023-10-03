import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {LoggerService} from "../logs/logs.service";

@Injectable()
export class AuthService {
    private readonly JWT_SECRET = 'ZEROQ';

    constructor(private readonly loggerService: LoggerService) {
    }

    /**
     * Genera un token de acceso JWT basado en el payload proporcionado.
     *
     * @param {Object} payload - Datos que se incluirán en el token.
     * @returns {string} Token de acceso JWT generado.
     */
    generateToken(payload: any): string {
        return jwt.sign(payload, this.JWT_SECRET, {expiresIn: '1h'});
    }

    /**
     * Compara una contraseña en texto plano con una contraseña hash.
     *
     * @param {string} plainPassword - Contraseña en texto plano.
     * @param {string} hashedPassword - Contraseña hash almacenada en la BD.
     * @returns {Promise<boolean>} `true` si la contraseña coincide, `false` si no.
     * @throws {UnauthorizedException} Si ocurre un error al comparar las contraseñas.
     */
    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (err) {
            this.loggerService.logError(err)
            throw new UnauthorizedException('Error authenticating user');
        }
    }

    /**
     * Verifica la validez del token.
     *
     * @param {string} token - Token de acceso JWT a verificar.
     * @returns {any} El contenido del token si es válido.
     * @throws {Error} Si el token no es válido.
     */
    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (err) {
            this.loggerService.logError(err)
            throw new Error('Invalid Token');
        }
    }
}
