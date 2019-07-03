import {IsDefined, IsNumber, IsString, Min} from 'class-validator';
import {userExists} from "../../rules/existUserValidationRule";

class kickOrInviteUserToGameValidator {

    @IsDefined()
    @IsString()
    @userExists({'message': 'Invalid user id'})
    public user_id: string | undefined;

}

export default kickOrInviteUserToGameValidator;
