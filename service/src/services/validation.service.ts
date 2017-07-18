import { ErrorType, ErrorTypeMessage } from '../models/error-type.enums';
import { ValidationError } from '../models/validation-error.model'
import { ValidationResult } from '../models/validation-result.model';

// Service to provide validation functions
// used by the rest of the application
// implemented as promises since validation can be asynchronous
export class ValidationService {
    // Validates the zip code for 0 length and number format of 12345
    // with optional extended zip code -1234
    public ValidateZipCode(zipCode: string): Promise<ValidationResult> {
        let validateRegExp = new RegExp(/^\d{5}(-\d{4})?$/);
        let input = (zipCode != null) ? zipCode : '';

        return new Promise((resolve: any) => {
            let validationResult: ValidationResult = {
                IsValid: input.length > 0 && validateRegExp.test(input),
                Error: null
            };

            if (!validationResult.IsValid) {
                validationResult.Error = new ValidationError(ErrorTypeMessage.InvalidZipCode, ErrorType.InvalidZipCode);
            }

            return resolve(validationResult);
        });
    }

    // Validates latitude and longitude coordinates for valid values
    // Latitude should be in the range of +/-90
    // Longitude should be in the range of +/-180
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
                validationResult.Error = new ValidationError(ErrorTypeMessage.InvalidCoordinates, ErrorType.InvalidCoordinates)
            }
            else if (!latIsValid) {
                validationResult.IsValid = false;
                validationResult.Error = new ValidationError(ErrorTypeMessage.InvalidLatitude, ErrorType.InvalidLatitude);
            }
            else if (!longIsValid) {
                validationResult.IsValid = false;
                validationResult.Error = new ValidationError(ErrorTypeMessage.InvalidLongitude, ErrorType.InvalidLongitude);
            }

            return resolve(validationResult);
        });
    }
}