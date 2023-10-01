import {Controller, Post, Body} from '@nestjs/common';
import {Users} from './users.model';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async createUser(@Body() user: Users) {
        return this.usersService.createUser(user);
    }
}
