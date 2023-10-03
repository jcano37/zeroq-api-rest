import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../src/app.module';

describe('AuthController (e2e)', () => {
    let app: { init: () => any; close: () => any; getHttpServer: () => any; };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/auth/login (POST) - should authenticate a user', async () => {
        const userData = {
            username: "user_test",
            password: "abcd1234",
        };

        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send(userData)
            .expect(201);

        expect(response.body).toHaveProperty('access_token');
    });

    it('/auth/login (POST) - should handle incorrect password', async () => {
        const userData = {
            username: "user_test",
            password: "incorrectpassword",
        };
        await request(app.getHttpServer())
            .post('/auth/login')
            .send(userData)
            .expect(401);
    });
});
