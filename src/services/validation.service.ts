import { ErrorType } from '../models/error-type.enum';
import { ValidationError } from '../models/validation-error.model'
import { ValidationResult } from '../models/validation-result.model';

export class ValidationService {
    public ValidateZipCode(zipCode: string): Promise<ValidationResult> {
        let validateRegExp = new RegExp(/^\d{5}(-\d{4})?$/);
        let input = (zipCode != null) ? zipCode : '';

        return new Promise((resolve: any) => {
            let validationResult: ValidationResult = {
                IsValid: input.length > 0 && validateRegExp.test(input),
                Error: null
            };

            if (!validationResult.IsValid) {
                validationResult.Error = new ValidationError('Invalid Zip Code', ErrorType.InvalidZipCode);
            }

            return resolve(validationResult);
        });
    }

    public ValidateCoordinates(lat: string, long: string): Promise<ValidationResult> {
        let latInput = (lat != null) ? lat : '';
        let longInput = (long != null) ? long : '';
        let latValidateRegExp = new RegExp(/^(-|\+)?(90|[0-8]?[0-9](\.[0-9]{0,6})?)$/);
        let longValidateRegExp = new RegExp(/^(-|\+)?(180|(1[0-7][0-9]|[0-9]{0,2})(\.[0-9]{0,6})?)$/);

        return new Promise((resolve: any) => {
            let validationResult: ValidationResult = {
                IsValid: true,
                Error: null
            };

            let latIsValid = latInput.length > 0 && latValidateRegExp.test(latInput);
            let longIsValid = longInput.length > 0 && longValidateRegExp.test(longInput);

            if (!latIsValid && !longIsValid) {
                validationResult.IsValid = false;
                validationResult.Error = new ValidationError('Invalid Coordinates', ErrorType.InvalidCoordinates)
            }
            else if (!latIsValid) {
                validationResult.IsValid = false;
                validationResult.Error = new ValidationError('Invalid Latitude', ErrorType.InvalidLatitude);
            }
            else if (!longIsValid) {
                validationResult.IsValid = false;
                validationResult.Error = new ValidationError('Invalid Longitude', ErrorType.InvalidLongitude);
            }

            return resolve(validationResult);
        });
    }
}