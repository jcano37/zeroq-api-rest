import {BadRequestException, Injectable} from '@nestjs/common';
import {Pool} from 'pg';
import {DatabaseConfig} from 'src/database/database.config';
import {Users} from "./users.model";
import {validate} from "class-validator";

@Injectable()
export class UsersService {
    private readonly pool: Pool;

    constructor(databaseConfig: DatabaseConfig) {
        this.pool = new Pool(databaseConfig.databaseOptions);
    }

    async createUser(userData: Users) {
        const validationErrors = await validate(userData);

        if (validationErrors.length > 0) {
            throw new BadRequestException(validationErrors);
        }
        const {username, password} = userData;
        const client = await this.pool.connect();
        try {
            const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
            const values = [username, password];
            const result = await client.query(query, values);
            return result.rows[0];
        } finally {
            client.release();
        }
    }
}
