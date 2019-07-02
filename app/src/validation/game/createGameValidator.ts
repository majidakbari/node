import {IsDefined, IsNumber} from 'class-validator';

class createGameValidator {

    @IsDefined()
    @IsNumber()
    public target_score: Number | undefined;

}

export default createGameValidator;
