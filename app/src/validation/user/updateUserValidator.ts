import {IsDefined, IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
import {IsUserAlreadyExist} from '../../rules/uniqueUserValidationRule';

class updateUserValidator {

    @IsDefined()
    @IsString()
    @MaxLength(255)
    public name: String | undefined;

    @IsDefined()
    @IsString()
    @IsEmail()
    @MaxLength(255)
    @IsUserAlreadyExist({'message': 'Email has already been taken'})
    public email: String | undefined;

    @IsDefined()
    @IsString()
    @MinLength(6)
    @MaxLength(255)
    public password: String | undefined;
}

export default updateUserValidator;
