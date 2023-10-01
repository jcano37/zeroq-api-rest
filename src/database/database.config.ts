import {Injectable} from '@nestjs/common';
import ProcessEnv = NodeJS.ProcessEnv;

@Injectable()
export class DatabaseConfig {
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
