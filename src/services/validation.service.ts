import { ValidationError } from '../models/validation-error.model'
import { ErrorType } from '../models/error-type.enum';

export class ValidationService {
    public ValidateZipCode(zipCode: string): Promise<ValidationError> {
        let input = zipCode || '';

        return new Promise((resolve: any, reject: any) => {
            if (!input.match(/\d{5}(-\d+)?/)) {
                return reject(new ValidationError('Invalid Zip Code', ErrorType.InvalidZipCode));
            }

            return resolve();
        });
    }
}