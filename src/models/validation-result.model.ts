import { ValidationError } from './validation-error.model';

export class ValidationResult {
    IsValid: boolean;

    Error: ValidationError;

    constructor(isValid?: boolean, error?: ValidationError) {
        this.IsValid = (isValid != null ) ? isValid : true;
        this.Error = (error != null ) ? error : null;
    }
}