import {Injectable} from '@nestjs/common';
import ProcessEnv = NodeJS.ProcessEnv;

/**
 * Datos de configuración para la conexión a la base de datos.
 */
@Injectable()
export class DatabaseConfig {
    /**
     * Obtiene los datos de configuración de la base de datos a partir de un .env
     * @returns {object} Datos de configuración de la base de datos.
     */
    public get databaseOptions(): any {
        const {
            DB_HOST,
            DB_PORT,
            DB_USER,
            DB_PASSWORD,
            DB_NAME,
        } = process.env as ProcessEnv;

        return {
            host: DB_HOST,
            port: parseInt(DB_PORT, 10),
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        };
    }
}
