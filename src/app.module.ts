import {Module} from '@nestjs/common';
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {DatabaseConfig} from './database/database.config';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, DatabaseConfig],
})
export class AppModule {
}
