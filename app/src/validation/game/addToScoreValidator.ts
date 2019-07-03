import {IsDefined, IsNumber, Min} from 'class-validator';

class addToScoreValidator {

    @IsDefined()
    @IsNumber()
    @Min(1)
    public score: Number | undefined;

}

export default addToScoreValidator;
