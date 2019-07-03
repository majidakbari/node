import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from "class-validator";
import {userRepository} from "../repository/userRepository";

@ValidatorConstraint({async: true})
export class userExistsConstraint implements ValidatorConstraintInterface {

    async validate(id: any, args: ValidationArguments) {
        const repo = new userRepository();
        try {
            return await repo.findOneById(id).then(user => {
                if (user) return true;
                return false;
            });
        } catch (e) {
            return false;
        }
    }

}

export function userExists(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: userExistsConstraint
        });
    };
}
