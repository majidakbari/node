import {IsDefined, IsNumber, Min} from 'class-validator';

class createGameValidator {

    @IsDefined()
    @IsNumber()
    @Min(1)
    public target_score: Number | undefined;

}

export default createGameValidator;
