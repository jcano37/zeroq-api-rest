import {IsString, MinLength} from 'class-validator';
import {JSONSchema} from 'class-validator-jsonschema';

@JSONSchema({
    title: 'User',
    description: 'Validating User Object',
    required: ['username', 'password'],
})
export class Users {
    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
}
