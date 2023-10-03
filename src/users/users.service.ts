import {BadRequestException, Injectable} from '@nestjs/common';
import {Pool} from 'pg';
import {DatabaseConfig} from 'src/database/database.config';
import {Users} from "./users.model";
import {validate} from "class-validator";
import {LoggerService} from '../logs/logs.service';
import * as bcrypt from 'bcrypt';

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
     */
    constructor(private readonly loggerService: LoggerService, databaseConfig: DatabaseConfig) {
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

        if (validationErrors.length > 0) {
            throw new BadRequestException(validationErrors);
        }

        const client = await this.pool.connect();

        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const query = 'SELECT * FROM insert_user($1, $2)';
            const values = [userData.username, hashedPassword];
            const result = await client.query(query, values);

            return result.rows[0]['insert_user'];

        } catch (error) {
            this.loggerService.logError(error);
            return error
        } finally {
            client.release();
        }
    }

    /**
     * Comprueba si un usuario ya existe en la base de datos.
     *
     * @param {string} username - El nombre de usuario que se va a verificar.
     * @returns {Promise<object|null>} Una promesa que resuelve a un objeto JSON si el usuario existe,
     * o `null` si no existe o si hay un error.
     */
    async userExists(username: string): Promise<any> {
        const client = await this.pool.connect();

        try {
            const query = 'SELECT user_exists($1) AS user_exists';
            const result = await client.query(query, [username]);

            return result.rows[0]['user_exists'];
        } catch (error) {
            this.loggerService.logError(error);
            return error
        } finally {
            client.release();
        }
    }
}
