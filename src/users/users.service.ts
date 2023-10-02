import {BadRequestException, Injectable} from '@nestjs/common';
import {Pool} from 'pg';
import {DatabaseConfig} from 'src/database/database.config';
import {Users} from "./users.model";
import {validate} from "class-validator";
import {LoggerService} from '../logs/logs.service';
import {CryptoService} from "../crypto/crypto.service";

/**
 * Servicio para la gestión de usuarios
 */
@Injectable()
export class UsersService {
    private readonly pool: Pool;

    /**
     * Constructor del servicio.
     * @param {LoggerService} loggerService - Servicio de registro de eventos.
     * @param {DatabaseConfig} databaseConfig - Configuración de la base de datos.
     * @param {CryptoService} cryptoService - Servicio de cifrado y descifrado.
     */
    constructor(private readonly loggerService: LoggerService, databaseConfig: DatabaseConfig, private readonly cryptoService: CryptoService) {
        this.pool = new Pool(databaseConfig.databaseOptions);
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param {Users} userData - Los datos del usuario a crear.
     * @returns {Promise<any>} Una promesa que resuelve con los datos del usuario creado.
     * @throws {BadRequestException} Si la validación de datos falla.
     * @throws {Error} Si ocurre un error durante la creación del usuario.
     */
    async createUser(userData: Users): Promise<any> {
        const validationErrors = await validate(userData);
        const DEBUG = process.env.DEBUG === 'true'

        if (validationErrors.length > 0) {
            throw new BadRequestException(validationErrors);
        }

        const client = await this.pool.connect();

        try {
            const query = 'SELECT * FROM insert_user($1, $2)';
            const values = [userData.username, this.cryptoService.encrypt(userData.password)];
            const result = await client.query(query, values);

            if (DEBUG)
                this.loggerService.logDebug(JSON.stringify(result.rows[0]));

            return result.rows[0];
        } catch (error) {
            this.loggerService.logError(error);
            throw new Error(error);
        } finally {
            client.release();
        }
    }
}
