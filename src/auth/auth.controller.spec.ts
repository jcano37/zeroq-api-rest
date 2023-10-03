import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersService} from '../users/users.service';
import {NotFoundException, UnauthorizedException} from '@nestjs/common';
import {LoggerService} from "../logs/logs.service";
import {DatabaseConfig} from "../database/database.config";

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, UsersService, LoggerService, DatabaseConfig],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('login', () => {
        it('Debería lanzar NotFoundException cuando el usuario no existe', async () => {
            const username = 'nonexistentuser';
            const password = 'password123';
            jest.spyOn(usersService, 'userExists').mockResolvedValue(null);

            try {
                await authController.login({username, password});
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual('User does not exist');
            }
        });

        it('Debería lanzar una excepción no autorizada cuando la contraseña sea incorrecta', async () => {
            const username = 'user_test';
            const password = 'incorrectpassword';
            const user = {id: 1, username: 'existinguser', password: 'correctpassword'};
            jest.spyOn(usersService, 'userExists').mockResolvedValue(user);
            jest.spyOn(authService, 'comparePasswords').mockResolvedValue(false);

            try {
                await authController.login({username, password});
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
                expect(error.message).toEqual('Password is incorrect');
            }
        });

        it('Debería devolver un token de acceso cuando la autenticación sea exitosa', async () => {
            const username = 'user_test';
            const password = 'abcd1234';
            const user = {id: 1, username: 'existinguser', password: 'correctpassword'};
            jest.spyOn(usersService, 'userExists').mockResolvedValue(user);
            jest.spyOn(authService, 'comparePasswords').mockResolvedValue(true);
            jest.spyOn(authService, 'generateToken').mockReturnValue('mocked-access-token');

            const result = await authController.login({username, password});

            expect(result).toEqual({access_token: 'mocked-access-token'});
        });
    });
});
