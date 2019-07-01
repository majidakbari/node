import {IsDefined, IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

class registerUserValidator {

    @IsDefined()
    @IsString()
    @MaxLength(255)
    public name: String = '';

    @IsDefined()
    @IsString()
    @IsEmail()
    @MaxLength(255)
    public email: String = '';

    @IsDefined()
    @IsString()
    @MinLength(6)
    @MaxLength(255)
    public password: String = '';
}

export default registerUserValidator;
