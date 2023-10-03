import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {AuthService} from './auth.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {
    }

    /**
     * Middleware para la autenticación JWT. Verifica la validez de un token JWT en las cabeceras de la solicitud.
     *
     * @param {Request} req - Objeto de solicitud HTTP.
     * @param {Response} res - Objeto de respuesta HTTP.
     * @param {NextFunction} next - Función de middleware para pasar al siguiente middleware en la cadena.
     * @returns {any}
     */
    use(req: Request, res: Response, next: NextFunction): any {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        try {
            req['user'] = this.authService.verifyToken(token);
            next();
        } catch (err) {
            return res.status(401).json({message: 'Invalid token'});
        }
    }
}
