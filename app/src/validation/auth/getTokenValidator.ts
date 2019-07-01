import {IsDefined, IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

class getTokenValidator {

    @IsDefined()
    @IsString()
    @IsEmail()
    @MaxLength(255)
    public email: String | undefined;

    @IsDefined()
    @IsString()
    @MinLength(6)
    @MaxLength(255)
    public password: String | undefined;
}

export default getTokenValidator;
